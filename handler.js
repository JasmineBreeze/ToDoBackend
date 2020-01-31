const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todos"
})

// GET 

app.get("/tasks", function (request, response) {

  connection.query("SELECT * FROM Task", function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        tasks: data
      });
    }
  });
});



// POST 

app.post("/tasks", function (request, response) {
  const newTask = request.body;
  connection.query("INSERT INTO Task SET ?", [newTask], function (err, data) {
    if (err) {
      response.status(500).json({ error: err });
    } else {
      newTask.id = data.insertId;
      response.status(201).json(newTask);
    }
  });
});

// PUT 

app.put("/tasks/:id", function (request, response) {


  const updatedTask = request.body;
  const id = request.params.id;

  connection.query('UPDATE Task SET ? WHERE id= ?', [updatedTask, id],
    function (err) {
      if (err) {
        response.status(500).json({ error: err });
      }
      else {
        response.sendStatus(200);
      }
    });
});

// DELETE 

app.delete("/tasks/:id", function (request, response) {
  const deletedTask = request.body;
  const id2 = request.params.id;
  connection.query('DELETE FROM Task WHERE id=?', [id2], function (err) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports.app = serverlessHttp(app);