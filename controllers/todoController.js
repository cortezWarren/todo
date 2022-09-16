var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [{ item: "get juice" }, { item: "play games" }, { item: "yoga" }];

module.exports = function (app) {
  app.get('/', (req,res) => {
    res.render('test');
  });
  
  app.get("/todo", function (req, res) {
    res.render("todo", { todos: data });
  });

  app.get('/blogs/search',(req,res) => {
    const search = req.query;
    console.log(JSON.stringify(search));
    res.send(search);
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    data.push(req.body);
    console.log(req.body);
    res.json(data);
    // console.log(res.json(data));
  });

  app.delete("/todo/:item", function (req, res) {
    data = data.filter(function (todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
  });
};
