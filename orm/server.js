const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");


const app = express();

var corsOptions = {
  origin: "http://localhost:9000"
};

app.use(cors(corsOptions));


const User = sequelize.define("users", {
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.BIGINT
  }
});


sequelize.sync({ force: true }).then(() => {
  User.create({ firstname: 'he', lastname: 'she', age:30 }).then(function() {
      return User.findAll();
    }).then(function(data) {
      console.log(data);
    });
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application." });
});

app.get('/users', function(req, res) {
  User.findAll().then(data => res.json(data));
});

app.get('/user/:id', function(req, res) {
  Note.findAll({ where: { id: req.params.id } }).then(data => res.json(data));
});

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});