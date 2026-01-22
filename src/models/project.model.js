import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    links: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.model("Project", ProjectSchema);
