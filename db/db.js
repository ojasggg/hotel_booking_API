import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("monogDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("monogDB connected");
});

export default connect;
