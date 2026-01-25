import express from "express";
import { getProjectsBySkill, getTopSkills, searchProfile } from "../controllers/query.controller.js";

const router = express.Router();

router.post("/projects", getProjectsBySkill);
router.get("/skills/top", getTopSkills);
router.post("/search", searchProfile);

export default router;
