const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    session: [
        {
            username: String,
            ip: String,
            device: String,
            os: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);