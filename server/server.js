import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: "30md", extended: true }));
app.use(express.urlencoded({ limit: "30md", extended: true }));

mongoose
  .connect(process.env.DB, { autoIndex: false })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err.message));


app.listen(process.env.PORT, () =>
  console.log("server running on", process.env.PORT)
);
