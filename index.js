const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
// my sql connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((e) => {
  if (e) {
    throw e;
  }
  console.log("database connected");
});

// create a table using hit the api
// app.get("/createProductTable", (req, res) => {
//   const sql =
//     "CREATE TABLE users(id int AUTO_INCREMENT, Name VARCHAR(30),Date_Of_Birth VARCHAR(50), Status VARCHAR(20), PRIMARY KEY(id))";
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("table created");
//   });
// });

// Insert a user to database

app.post("/users", (req, res) => {
  const data = req.body;
  data.Status = "ACTIVE";
  const sql = "INSERT INTO users SET?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// get only pause profile

app.get("/users/paused", (req, res) => {
  const sql = "SELECT * FROM users WHERE Status='PAUSED'";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// update user status
// http://localhost:5000/users/1?status=PAUSED
app.post("/users/:id", (req, res) => {
  const status = req.query.status;
  const id = req.params.id;
  const sql = `UPDATE users set Status='${status}' WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a profile

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
