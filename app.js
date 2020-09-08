const express = require("express");
const morgan = require("morgan");
const blogRouter = require("./routes/blogRoutes");
var translate = require("node-google-translate-skidz");
const bodyParser = require("body-parser");

//express app
const app = express();

//register View Engine
app.set("view engine", "ejs");
// app.set('views');

//app.use always run with every request

//middleware & static files (public files)
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.urlencoded({ extended: true })); //take all request url data pass in an object

app.get("/", (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname }); //old way
  // res.redirect('/blogs');
  let data = [];
  res.render("index", { data });
});
app.post("/", async (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname }); //old way
  // res.redirect('/blogs');
  const { text } = req.body;
  let data = [];

  if (!text) {
    return res.status(400).send(error);
  }
  await data.push({ language: "Texto Original", text });
  await translate(
    {
      text: text,
      source: "es",
      target: "en",
    },
    function (result) {
      data.push({ language: "Inglés", text: result.translation });
    }
  );
  await translate(
    {
      text: text,
      source: "es",
      target: "fr",
    },
    function (result) {
      data.push({ language: "Francés", text: result.translation });
    }
  );
  await translate(
    {
      text: text,
      source: "es",
      target: "it",
    },
    function (result) {
      data.push({ language: "Italiano", text: result.translation });
    }
  );
  await translate(
    {
      text: text,
      source: "es",
      target: "pt",
    },
    function (result) {
      data.push({ language: "Portugués", text: result.translation });
    }
  );
  await translate(
    {
      text: text,
      source: "es",
      target: "ca",
    },
    function (result) {
      data.push({ language: "Catalán", text: result.translation });
    }
  );
  await translate(
    {
      text: text,
      source: "es",
      target: "ro",
    },
    function (result) {
      data.push({ language: "Romanian", text: result.translation });
    }
  );

  res.render("index", { data });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//blog routes
// app.use('/blog', blogRouter); nếu bỏ /blog trong route
app.use(blogRouter);

//404 page phải nằm cuối vì express sẽ chạy get lần lượt từ trên xuống để check url
// nếu nằm bên trên about thì sẽ được chạy => sai
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render("404", { title: "404" });
});

app.listen(3000, function () {
  console.log("Server is on");
});
