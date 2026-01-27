import express from "express";
import { createProject, searchProjectsBySkill } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/", searchProjectsBySkill);

export default router;
