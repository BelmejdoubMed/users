// express require
const express = require("express");
const app = express();
const port = 3000;

// body-parser require
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors require
const cors = require("cors");
app.use(cors());

//mysql require
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "drg",
});

// connect to mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// get all users
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});
//check exicting pseudo and pw exicete
app.get("/users/:pseudo/:pw", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE pseudo = ? AND pw = ?",
    [req.params.pseudo, req.params.pw],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// get user by id
app.get("/users/:id", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// add user
app.post("/users", (req, res) => {
  connection.query("INSERT INTO users SET ?", req.body, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// update user
app.put("/users/:id", (req, res) => {
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// delete user
app.delete("/users/:id", (req, res) => {
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
