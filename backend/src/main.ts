import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { DB_URL, PORT } from "./config";
import cors from "cors";

// Routes
import blog from "./routes/blog";
import HttpError from "./utils/http-error";

const app = express();
const corsOptions = {
  credentials: true,
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/blogs", blog);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our server- Dosomecoding" });
});
app.use(() => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error.message, error.statusCode);
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "An Unknown error occured" });
};

app.use(errorHandler);

mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect database please your url");
  });
