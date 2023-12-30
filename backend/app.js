const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const movieRouter = require("./routes/movieRouter");
const cors = require("cors");
const bookingRouter = require("./routes/bookingRoutes");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);

mongoose
  .connect(
    `mongodb+srv://om:${process.env.MONGO_PASSWORD}@cluster0.nnceu.mongodb.net/bookmyshow`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log(
        `Database is connected and sserver is running on http://localhost:${5000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
