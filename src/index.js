const express = require("express");
const app = express();
const catsRouter = require("./routes/cats.router");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello man!");
});

app.use("/", catsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//nodemon: npm install -D nodemon
