import mongoose, { model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default model<IBlog>("Blog", blogSchema);
