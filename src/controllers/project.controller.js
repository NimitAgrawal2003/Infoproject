import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE PROJECT
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, links } = req.body;

  const project = await Project.create({
    title,
    description,
    links
  });

  return res.status(201).json(
    new ApiResponse(201, project, "Project created successfully")
  );
});

// SEARCH PROJECTS BY SKILL
export const searchProjectsBySkill = asyncHandler(async (req, res) => {
  const { skill } = req.query;

  const users = await User.find({ skills: skill }).populate("projects");

  let projects = [];
  users.forEach(user => {
    projects.push(...user.projects);
  });

  return res.json(
    new ApiResponse(200, projects, "Projects fetched successfully")
  );
});
