import express from "express";
import {
  getAllUserTransaction,
  getAllAdminTransaction,
  createTransaction,
} from "../controllers/transactionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/userTransaction", protect, getAllUserTransaction);

router.get("/adminTransaction", protect, admin, getAllAdminTransaction);

router.post("/", protect, createTransaction);

export default router;
