import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Database connected successfully");

    server = app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
}

startServer();
