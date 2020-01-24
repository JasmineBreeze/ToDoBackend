const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET 

app.get("/tasks", function (request, response) {


  response.status(200).json({
    tasks: [
      {
        id: 1,
        item: "Do Washing",
        dateDue: "2020-01-29",
        edit: false
      },
      {
        id: 2,
        item: "Write Songs",
        dateDue: "2020-02-29",
        edit: false
      },
      {
        id: 3,
        item: "Do Homework",
        dateDue: "2020-02-05",
        edit: false
      }
    ]
  });
});

// POST 

app.post("/tasks", function (request, response) {
  const newTask = request.body;

  response.status(200).json({
    message: `Successfully added to do item: ${newTask.item}, due for: ${newTask.dateDue}`
  });
});

// PUT 

app.put("/tasks/:id", function (request, response) {


  const updatedTask = request.body;
  const id = request.params.id;

  response.status(200).json({
    message: `Successfully updated task ID ${id} with item: ${updatedTask.item}, due for: ${updatedTask.dateDue}`
  });
});

// DELETE /developers

app.delete("/tasks/:id", function (request, response) {
  const deletedTask = request.body;
  const id2 = request.params.id;

  response.status(200).json({
    message: `Successfully deleted task ID ${id2} with name: ${deletedTask.item}`
  });
});

module.exports.app = serverlessHttp(app);