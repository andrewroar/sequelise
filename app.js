//const { sequelize, Employee } = require("./models");
const { sequelize, Employee } = require("./models");
const cors = require("cors");
var express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(express.static("public"));

/////////////////////////////////////
//const DB_URI =
//  process.env.MONGODB_URI ||
//  "mysql://yfc9sek7kuhvrh5p:f8jolhlqqnf7pq2r@ulsq0qqx999wqz84.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/pzhe4fcsxyb3zpam";
//
//const MONGOOSE_OPTIONS = {
//  useUnifiedTopology: true,
//  useCreateIndex: true,
//  useNewUrlParser: true,
//};
//
//mongoose.connect(DB_URI, MONGOOSE_OPTIONS);
//////////////////////////////////

app.get("/", async (req, res) => {
  try {
    const quotes = await Employee.findAll();

    res.json({
      results: quotes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/test", async (req, res) => {
  try {
    res.json({
      results: { hello: "wordl" },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/employee", async (req, res) => {
  const { name, role } = req.body;

  Employee.create({
    name: req.body.name,
    role: req.body.role,
  }).catch(function (err) {
    res.status(401).json(err);
  });
});

app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );

  //await sequelize.sync({ force: false });
});
