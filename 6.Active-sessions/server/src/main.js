const express = require("express");
const mongoose = require("mongoose");
const requestIp = require("request-ip");
const useragent = require("express-useragent");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/routes");
const sessionMiddleware = require("./middleware/middleware");
const app = express();
const PORT = process.env.PORT || 5004;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(useragent.express());
app.use(requestIp.mw());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.log(" MongoDB Connection Error:", err));

app.use(sessionMiddleware);

app.use("/", authRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
