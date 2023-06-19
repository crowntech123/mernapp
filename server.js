const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const cors = require("cors");
app.use(cors());
const userRouter = require("./routes/userRoute");

app.use(express.json());
//data filled by user will be converted to json

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModified: false,
  })
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT || 8000, (err) => {
      if (err) {
        console.log("error" + err);
      } else {
        console.log("running successfully on port", PORT);
      }
    });
  })
  .catch((error) => {
    console.log("not connected" + error);
  });
app.use(userRouter);
