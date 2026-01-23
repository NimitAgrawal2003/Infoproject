import express from "express"
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    updateUserById,
    deleteUserById
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyJWT, logoutUser);


router.put("/:id", verifyJWT, updateUserById);
router.delete("/:id", verifyJWT, deleteUserById);


export default router