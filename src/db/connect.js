import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "\n MongoDB Connected with name: ",
      connectionInstance.connection.name,
      " with HOST ID: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("\n MongoDB connected failed : ", error);
    process.exit(1);
  }
};
