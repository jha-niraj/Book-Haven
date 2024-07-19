// Installing dependecies:
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;

// Inporting the necessary files and module:
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./config/db");

// Initializing an Express instance:
const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}---`);
})