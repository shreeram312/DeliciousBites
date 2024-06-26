import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

console.log(process.env.MONGO_URI);

try {
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 60000,
  });
} catch (err) {
  console.log(err);
}

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 1,
    maxLength: 30,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
