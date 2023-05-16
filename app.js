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

// Error handler
// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).send("Something went wrong");
// });

app.use(function (err, req, res, next) {
  res
    .status(422)
    .send({ error: err.message, message: "Invalid data provided" });
}); // action could not be processed properly due to invalid data provided

app.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
