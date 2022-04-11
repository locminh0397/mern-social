import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//import router
import postRoutes from "./routes/postRoute.js";
import authRoutes from "./routes/userRoute.js";

mongoose
  .connect(process.env.DB, { autoIndex: false })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err.message));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req,res) => {
  res.send('API running...')
})

app.listen(process.env.PORT, () =>
  console.log("server running on", process.env.PORT)
);
