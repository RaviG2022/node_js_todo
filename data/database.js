import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backend",
    })
    .then((c) => console.log(`database connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
