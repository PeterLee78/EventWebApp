import asyncHandler from "../middleware/asyncHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUserTransaction = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot find transaction");
  }
});

const getAllAdminTransaction = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        eventId: eventId,
      },
    });
    res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot find data");
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  const { userId, eventId, total, qty } = req.body;
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        eventId,
        total: Number(total),
        qty: Number(qty),
      },
    });
    res.status(200).json({ newTransaction });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Transaction");
  }
});

export { getAllUserTransaction, getAllAdminTransaction, createTransaction };
