import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `MONGODB connected successfully !! host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed !!", error);

    process.exit(1);
  }
};

export default dbConnection;
