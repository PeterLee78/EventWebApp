import express from "express";
import {
  login,
  register,
  checkAdmin,
  checkLogin,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// router.get("/checkLogin", protect, checkLogin);
// router.get("/checkAdmin", protect, admin, checkAdmin);

export default router;
