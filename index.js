import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./db/db.js";
import authRoute from "./routes/auth.route.js";
import hotelRoute from "./routes/hotel.route.js";
import roomRoute from "./routes/room.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  db();
  console.log(`listening on port ${process.env.PORT}`);
});
