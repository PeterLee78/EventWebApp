import express from "express";
import {
  getAllEvents,
  getAdminEvent,
  getEvent,
  createEvent,
  deleteEvent,
  getEventVoucher,
} from "../controllers/eventControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "images" });
// router.get("/", getAllEvents).post(protect, admin, createEvent);
router.route("/").get(getAllEvents).post(protect, admin, createEvent);

router.route("/adminEvent").get(getAdminEvent);

router.get("/:id", getEvent);

router.delete("/:id", deleteEvent);
// router.post("/register", register);
router.get("/:id/eventVoucher", getEventVoucher);

export default router;
