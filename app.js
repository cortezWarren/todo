const express = require("express");
const todoController = require("./controllers/todoController");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const dbURI =
  "mongodb+srv://mongoTest:fRbuubGobFAZFEcz@cluster0.a9ozy51.mongodb.net/nodeDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// template engine
app.set("view engine", "ejs");

// static files
app.use(express.static("./public"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "newer blog 2",
    snippet: "new about my blog",
    body: "more about my blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// fire controllers
todoController(app);

//ports
console.log("You are running to port 3000");
