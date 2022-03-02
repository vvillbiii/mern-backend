//dependencies
const express = require("express");
//connecting to db
const dbConnection = require("./Config/db.connections");
//importing model
const People = require("./Models/People");
//.env
require("dotenv").config();
const { PORT = 5000 } = process.env;

const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//PEOPLE SHOW ROUTE
app.get("/people/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // send all people
    res.json(await People.findById(id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UPDATE ROUTE
app.put("/people/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPerson = req.body;
  try {
    // send all people
    res.json(await People.findByIdAndUpdate(id, updatedPerson, { new: true }));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // send all people
    res.json(await People.findByIdAndRemove(id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Listener
app.listen(PORT, () => {
  console.log(`Listening on on port ${PORT}`);
});
