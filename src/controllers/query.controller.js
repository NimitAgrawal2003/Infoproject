import { User } from "../models/user.model.js";
import "../models/project.model.js";   
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const getProjectsBySkill = asyncHandler(async (req, res) => {

  const skill = req.body.skill;

  if (!skill) {
    return res.status(400).json(
      new ApiResponse(400, null, "skill is required")
    );
  }

  const users = await User.find({ skills: skill }).populate("projects");

  let projects = [];

  for (let user of users) {
    for (let project of user.projects) {
      projects.push(project);
    }
  }

  res.json(new ApiResponse(200, projects, "Projects fetched successfully"));
});



export const getTopSkills = asyncHandler(async (req, res) => {

  const users = await User.find();

  let skillCount = {};

  for (let user of users) {
    for (let skill of user.skills) {

      if (skillCount[skill]) {
        skillCount[skill] += 1;
      } else {
        skillCount[skill] = 1;
      }

    }
  }

  res.json(new ApiResponse(200, skillCount, "Top skills fetched successfully"));
});



export const searchProfile = asyncHandler(async (req, res) => {

  const q = req.body.q;

  if (!q) {
    return res.status(400).json(
      new ApiResponse(400, null, "search query (q) is required")
    );
  }

  const users = await User.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { skills: { $regex: q, $options: "i" } }
    ]
  }).populate("projects");

  res.json(new ApiResponse(200, users, "Search results"));
});
