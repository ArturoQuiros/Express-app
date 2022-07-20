const express = require("express");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const app = express();
const catsRouter = require("./routes/cats.router");
const employeesRouter = require("./routes/employees.router");
const usersRouter = require("./routes/users.router");
const port = 3000;

const url =
  "mongodb+srv://R2D2:Ifpifp100@cluster0.ueqyt.mongodb.net/catsdb?retryWrites=true&w=majority";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello man!");
});

app.use("/api/cats", catsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  const error = new HttpError("Could not find this route...", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!!" });
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//nodemon: npm install -D nodemon
//npm install axios
//npm i http-status-codes
//npm install --save mongodb
//npm install --save mongoose
//npm start
