import asyncHandler from "../middleware/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await prisma.event.findMany();
  res.status(200).json(events);
});

const getEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(event);
});

const createEvent = asyncHandler(async (req, res) => {
  const {
    eventName,
    image,
    description,
    address,
    city,
    category,
    price,
    eventDate,
    availableTickets,
  } = req.body;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;

  try {
    const newEvent = await prisma.event.create({
      data: {
        eventName: eventName,
        image: image,
        description: description,
        address: address,
        city: city,
        category: { connect: { id: category } },
        price: Number(price),
        eventDate: new Date(eventDate),
        availableTickets: Number(availableTickets),
        user: { connect: { id: currentUserId } },
      },
    });
    res.status(200).json(newEvent);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create new event");
  }
});

const editEvent = asyncHandler(async (req, res) => {});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete event");
  }
});

const getEventVoucher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const eventVoucher = await prisma.eventVoucher.findUnique({
      where: { eventId: id },
    });
    res.status(200).json(eventVoucher);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to find event's discount voucher");
  }
});

const createEventVoucher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { discount, code } = req.body;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;
  const currentVoucherEvent = await prisma.event.findFirst({
    eventId: id,
  });

  if (currentUserId === currentVoucherEvent.id) {
    try {
      const newEventVoucher = await prisma.eventVoucher.create({
        data: {
          discount: discount,
          code: code,
        },
      });

      res.status(200).json(newEventVoucher);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create new Event Voucher");
    }
  } else {
    throw new Error("Not authorized to create");
  }
});

const getAdminEvent = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const events = await prisma.event.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to find data");
  }
});

export {
  getAllEvents,
  getEvent,
  getAdminEvent,
  createEvent,
  deleteEvent,
  getEventVoucher,
};
