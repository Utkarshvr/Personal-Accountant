require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/api", require("./routes/root"));

app.all("*", (req, res) => 
  res.status(404).json({ message: "404 ROUTE NOT FOUND" })
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );

});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
