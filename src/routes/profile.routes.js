import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getProfile);
router.put("/", verifyJWT, updateProfile);

export default router;
