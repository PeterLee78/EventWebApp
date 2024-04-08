import { PrismaClient } from "@prisma/client";
import colors from "colors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

function voucherExpiration(date) {}

async function importData() {
  try {
    const users1 = await prisma.user.create({
      data: {
        firstName: "Peter",
        lastName: "Lee",
        email: "peter@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
        referralNumber: uuidv4().substring(0, 8),
        saldo: 10000,
        // discountVoucher: [],
        // events: [],
        // reviews: [],
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const users2 = await prisma.user.create({
      data: {
        firstName: "admin",
        lastName: "guy",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
        referralNumber: uuidv4().substring(0, 8),
        saldo: 0,
        // discountVoucher: [],
        // events: [],
        // reviews: [],
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const users3 = await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
        referralNumber: uuidv4().substring(0, 8),
        saldo: 0,
        // discountVoucher: [],
        // events: [],
        // reviews: [],
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const users4 = await prisma.user.create({
      data: {
        firstName: "second",
        lastName: "admin",
        email: "secondAdmin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
        referralNumber: uuidv4().substring(0, 8),
        saldo: 0,
        // discountVoucher: [],
        // events: [],
        // reviews: [],
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const sportCategory = await prisma.category.create({
      data: {
        name: "sport",
      },
    });

    const concertCategory = await prisma.category.create({
      data: {
        name: "concert",
      },
    });

    const conferenceCategory = await prisma.category.create({
      data: {
        name: "conference",
      },
    });

    const festivalCategory = await prisma.category.create({
      data: {
        name: "festival",
      },
    });

    const communityCategory = await prisma.category.create({
      data: {
        name: "community",
      },
    });

    const event1 = await prisma.event.create({
      data: {
        eventName: "Taylor Swift concert",
        image: "image",
        description:
          "Welcome to Taylow Swift concert, Taylor Swift will perform 10 songs, the concert will be in Jakarta",
        address: "Papanggo, Tanjung Priok, North Jakarta City",
        city: "Jakarta",
        category: { connect: { id: concertCategory.id } },
        price: 200000,
        eventDate: new Date("2024-03-24 19:30:00"),
        availableTickets: 20000,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event2 = await prisma.event.create({
      data: {
        eventName: "Persib vs Persija",
        image: "image",
        description:
          "Mari nonton Persib vs Persija, 2 tim yg sedang merebut juara liga 1",
        address:
          "Jl. A. Yani No.252, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat 40262",
        city: "Bandung",
        category: { connect: { id: sportCategory.id } },
        price: 100000,
        eventDate: new Date("2024-04-24 20:30:00"),
        availableTickets: 1000,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event3 = await prisma.event.create({
      data: {
        eventName: "Dewa 19",
        image: "image",
        description: "Mari nonton Dewa 19",
        address: "Papanggo, Tanjung Priok, North Jakarta City",
        city: "Jakarta",
        category: { connect: { id: concertCategory.id } },
        price: 50000,
        eventDate: new Date("2024-04-24 20:30:00"),
        availableTickets: 100,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event4 = await prisma.event.create({
      data: {
        eventName: "Joji",
        image: "image",
        description:
          "Joji is performing in Bandung, come and watch in the stadium",
        address:
          "Jl. A. Yani No.252, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat 40262",
        city: "Bandung",
        category: { connect: { id: concertCategory.id } },
        price: 100000,
        eventDate: new Date("2024-08-24 20:30:00"),
        availableTickets: 20000,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event5 = await prisma.event.create({
      data: {
        eventName: "Medan Business Expo",
        image: "image",
        description:
          "Come to the biggest business expo in Medan where you can find suppliers and market yourself as a supplier!",
        address:
          "Medan International Convention Center, Jl. Gagak Hitam No.1, Sei Sikambing B, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20122",
        city: "Medan",
        category: { connect: { id: conferenceCategory.id } },
        price: 0,
        eventDate: new Date("2024-09-24 20:30:00"),
        availableTickets: 20000,
        // reviews: [],
        user: { connect: { id: users4.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event6 = await prisma.event.create({
      data: {
        eventName: "Makassar Business Expo",
        image: "image",
        description: "come to the largest business expo in Makassar",
        address:
          "Aston Makassar Hotel and Convention center, Jl. Sultan Hasanuddin No.10, Baru, Kec. Ujung Pandang, Kota Makassar, Sulawesi Selatan 90174",
        city: "Makassar",
        category: { connect: { id: conferenceCategory.id } },
        price: 0,
        eventDate: new Date("2024-11-24 20:30:00"),
        availableTickets: 500,
        // reviews: [],
        user: { connect: { id: users4.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event7 = await prisma.event.create({
      data: {
        eventName: "Jakarta Food Festival",
        image: "image",
        description:
          "Come to the biggest food festival in Jakarta. We have over 60 stalls of your favorite food and drinks!",
        address:
          "Jakarta International Expo,  Jalan Benyamin Sueb No. 1, Pademangan, jakarta Utara",
        city: "Jakarta",
        category: { connect: { id: festivalCategory.id } },
        price: 0,
        eventDate: new Date("2024-04-24 20:30:00"),
        availableTickets: 100000,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event8 = await prisma.event.create({
      data: {
        eventName: "Bandung Food Festival",
        image: "image",
        description:
          "Come to the biggest food festival in Bandung. We have over 60 stalls of your favorite food and drinks!",
        address:
          "Bandung Convention Center, Jl. Soekarno Hatta No.354, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
        city: "Bandung",
        category: { connect: { id: festivalCategory.id } },
        price: 0,
        eventDate: new Date("2024-05-22 20:30:00"),
        availableTickets: 1000,
        // reviews: [],
        user: { connect: { id: users4.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event9 = await prisma.event.create({
      data: {
        eventName: "JKT48",
        image: "image",
        description: "Mari nonton JKT 48",
        address: "JKT48 Theater, fx Sudirman",
        city: "Jakarta",
        category: { connect: { id: concertCategory.id } },
        price: 150000,
        eventDate: new Date("2024-06-11 09:30:00"),
        availableTickets: 1000,
        // reviews: [],
        user: { connect: { id: users4.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const event10 = await prisma.event.create({
      data: {
        eventName: "Komunitas Batik",
        image: "image",
        description: "Mari nikut komunitas Batik di Jogja",
        address: "Kota Gede",
        city: "Yohyakarta",
        category: { connect: { id: communityCategory.id } },
        price: 0,
        eventDate: new Date("2024-03-24 20:30:00"),
        availableTickets: 100,
        // reviews: [],
        user: { connect: { id: users2.id } },
        // transaction: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const eventVoucher1 = await prisma.eventVoucher.create({
      data: {
        code: "EVENT1",
        discount: 10,
        event: { connect: { id: event2.id } },
      },
    });

    const eventVoucher2 = await prisma.eventVoucher.create({
      data: {
        code: "EVENT2",
        discount: 30,
        event: { connect: { id: event3.id } },
      },
    });

    const transaction1 = await prisma.transaction.create({
      data: {
        userId: users1.id,
        eventId: event1.id,
        total: 400000,
        qty: 2,
      },
    });

    const transaction2 = await prisma.transaction.create({
      data: {
        userId: users3.id,
        eventId: event1.id,
        total: 200000,
        qty: 1,
      },
    });

    const transaction3 = await prisma.transaction.create({
      data: {
        userId: users1.id,
        eventId: event4.id,
        total: 300000,
        qty: 3,
      },
    });

    const transaction4 = await prisma.transaction.create({
      data: {
        userId: users1.id,
        eventId: event5.id,
        total: 0,
        qty: 5,
      },
    });

    const transaction5 = await prisma.transaction.create({
      data: {
        userId: users3.id,
        eventId: event7.id,
        total: 0,
        qty: 2,
      },
    });

    const review1 = await prisma.review.create({
      data: {
        content: "Pretty Good event",
        rating: 4,
        userId: users1.id,
        eventId: event1.id,
      },
    });

    const review2 = await prisma.review.create({
      data: {
        content: "Pretty Boring Event",
        rating: 2,
        userId: users3.id,
        eventId: event1.id,
      },
    });

    const review3 = await prisma.review.create({
      data: {
        content: "the best Event I've ever been to",
        rating: 5,
        userId: users1.id,
        eventId: event4.id,
      },
    });

    const review4 = await prisma.review.create({
      data: {
        content: "So so event, not bad, not good",
        rating: 3,
        userId: users1.id,
        eventId: event5.id,
      },
    });

    const review5 = await prisma.review.create({
      data: {
        content: "Amazing Event!!",
        rating: 5,
        userId: users3.id,
        eventId: event7.id,
      },
    });

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error seeding Data", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function destroyData() {
  try {
    await prisma.transaction.deleteMany();
    await prisma.review.deleteMany();
    await prisma.discountVoucher.deleteMany();
    await prisma.eventVoucher.deleteMany();
    await prisma.pointVoucher.deleteMany();

    await prisma.event.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log("Seeder data destroyed successfully");
  } catch (error) {
    console.error("Error destroying seeder data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
