import asyncHandler from "../middleware/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const getEventVoucher = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  try {
    const eventVoucher = await prisma.eventVoucher.findFirst({
      eventId: eventId,
    });
    if (eventVoucher) {
      res.status(200).json(eventVoucher);
    } else {
      res.status(404).json({ messsage: "No coupon voucher" });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error finding event voucher");
  }
});

const createEventVoucher = asyncHandler(async (req, res) => {});
