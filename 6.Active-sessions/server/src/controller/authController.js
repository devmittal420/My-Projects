
const bcrypt = require("bcryptjs");
const User = require("../user/user.js");

const registerOrLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ msg: "Username and password required" });

    let user = await User.findOne({ username });

    // If user does not exist, so user register
    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword, session: [] });
        await user.save();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ msg: "Invalid credentials" });

    // Get IP, Device & windows information
    const ip = req.clientIp;
    const device = req.useragent.platform;
    const os = req.useragent.os;

    const sessionData = { username, ip, device, os, createdAt: new Date() };

    //  Store session data
    user.session.push(sessionData)
    await user.save();

    // check active user session after reload also 
    req.session.user = sessionData;
    res.send({ msg: "User loggedin & session created", sessionData });
};

const checkSession = async (req, res) => {

    if (!req.session.user) {
        return res.status(400).send({ msg: "No active session" })
    }

    // if user session active before reload so finduser run
    const findUser = await User.findOne({ username: req.session.user.username })

    if (!findUser) {
        return res.status(400).send({ msg: "No user found" });
    }
    console.log(findUser.session, "find");
    res.send({ session: findUser.session });
};

const logout = async (req, res) => {

    const { id } = req.body;
    console.log(id, "id");

    if (!id) {
        return res.status(400).send({ msg: "Id required" })
    }
    let findUserId = await User.findOne({ "session._id": id })
    if (!findUserId) {
        return res.status(400).send({ msg: "Id is not matched" })
    }

    findUserId.session = findUserId.session.filter((prev) => prev._id.toString() !== id)
    await findUserId.save()
    res.send({ msg: " Logged out" });
};

module.exports = { registerOrLogin, checkSession, logout };

