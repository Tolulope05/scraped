const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cheerio = require("cheerio");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
