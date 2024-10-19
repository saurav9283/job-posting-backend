require("dotenv").config();


const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/db-connection");
const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const port = process.env.APP_PORT || 8080;

// Routes definition
app.use('/', require('./routes'));


// Handle 404 errors
app.use(function (req, res) {
  res.status(404).json({ error: "Unable to find the requested resource!" });
});

app.use(errorMiddleware);


process.on("uncaughtException", function (err) {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled rejection at:", p, "reason:", reason);
});


app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});