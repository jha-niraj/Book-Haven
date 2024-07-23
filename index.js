// Installing dependecies:
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;

// Inporting the necessary files and module:
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./config/db");

// Initializing an Express instance:
const app = express();

const allowedOrigins = ['https://book-haven-ebon.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
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