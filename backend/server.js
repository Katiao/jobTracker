import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

// db and authenticate user
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// to make json data available to us in the controllers
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);

//restricted: requires token
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// only spin up server if connection to database successful
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
