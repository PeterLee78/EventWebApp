import asyncHandler from "../middleware/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const userId = user.id;
  const userEmail = user.email;
  const isAdmin = user.isAdmin;

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (user && isCorrectPassword) {
    const token = jwt.sign(
      { userId, userEmail, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ token });
    // res.status(200).json({
    //   id: userId,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    // });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, referralCode } = req.body;

  // Check if user already exist
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!referralCode) {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: bcrypt.hashSync(password, 10),
          isAdmin: false,
          referralNumber: uuidv4().substring(0, 8),
          saldo: 0,
        },
      });
      const userId = newUser.id;
      const userEmail = newUser.email;
      const isAdmin = newUser.isAdmin;
      const token = jwt.sign(
        { userId, userEmail, isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      throw new Error("failed to create new user");
    }
  }
  // Check if they register with referral code

  const referralUser = await prisma.user.findUnique({
    where: {
      referralNumber: referralCode,
    },
  });

  if (referralUser) {
    // Create a new Date object representing the current date
    const expireDate = new Date();

    // Get the current month and add three months to it
    const newMonth = expireDate.getMonth() + 3;

    // Set the month of the currentDate object to the new month
    expireDate.setMonth(newMonth);

    try {
      const createPointVoucher = await prisma.pointVoucher.create({
        data: {
          discount: 10000,
          user: { connect: { id: referralUser.id } },
          expires: expireDate,
        },
      });

      const newUser = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: bcrypt.hashSync(password, 10),
          isAdmin: false,
          referralNumber: uuidv4().substring(0, 8),
          saldo: 0,
        },
      });

      const newDiscountVoucher = await prisma.discountVoucher.create({
        data: {
          discount: 10,
          user: { connect: { id: newUser.id } },
          expires: expireDate,
        },
      });

      const userId = newUser.id;
      const userEmail = newUser.email;
      const isAdmin = newUser.isAdmin;
      const token = jwt.sign(
        { userId, userEmail, isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).json({ token });

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        id: userId,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Cannot create new User with voucher");
    }
  } else {
    throw new Error("Invalid Referral Code");
  }
});

const checkLogin = asyncHandler(async (req, res) => {
  res.send("you are Logged in");
});

const checkAdmin = asyncHandler(async (req, res) => {
  res.send("you are admin");
});

export { login, register, checkLogin, checkAdmin };
