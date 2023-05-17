const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/search", (req, res) => {
  req.query.book = req.query.book.replace(" ", "-");
  const url = `https://www.bibleref.com/${req.query.book}/${req.query.chapter}/${req.query.book}-${req.query.chapter}-${req.query.verse}.html`;
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      console.log(html);
      const articles = [];

      $(".comment", html).each(function () {
        //<-- cannot be a function expression
        const text = $(this).text();
        const title = $(this).find("h1").text();
        // console.log(title);
        // console.log(text);
        articles.push({
          text: text
            .replace(title, "")
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/^\s+|\s+$/gm, ""),
          title: title.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/gm, ""),
        }); // This is a regular expression pattern that matches different types of line breaks.
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
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
