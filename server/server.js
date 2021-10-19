require("dotenv").config();
const express = require('express')
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
const { PORT, MONGO_URI } = process.env;//환경변수
const {authenticate} = require("./middleware/authentication");

mongoose.connect(MONGO_URI
).then(() => {
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(authenticate);
    app.use("/images", imageRouter);
    app.use("/users", userRouter);

    app.listen(PORT, () => console.log("Express server listening on PORT " + PORT));
})
    .catch((err) => console.log(err));



