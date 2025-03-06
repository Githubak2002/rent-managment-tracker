import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from "../lib/db.js";
import Renter from "../models/renter.model.js";
import Payment from "../models/payment.model.js";

const sampleData = {
  renters: [
    {
      _id: "67c433df39f1e3a2058c6906",
      name: "Puja Di",
      phoneNumber: "1234567890",
      moveInDate: "02/March/2025",
      initialLightMeterReading: 9421,
      comments: "ok",
      active: false,
      movedOutDate: "2025-03-02",
      payments: [
        {
          date: "02/March/2025",
          lightMeterReading: 4351,
          rentPaid: 7000,
          lightBillPaid: 1000,
          waterBillPaid: 500,
          paymentMode: "Cash",
          onlinePlatform: null,
          comments: "ok",
          _id: "67c4352339f1e3a2058c6924",
        },
        {
          date: "02/March/2025",
          lightMeterReading: 2,
          rentPaid: 32,
          lightBillPaid: 3,
          waterBillPaid: 3,
          paymentMode: "Online",
          onlinePlatform: "Paytm",
          comments: "ok",
          _id: "67c440f339f1e3a2058c69b3",
        },
      ],
    },
    {
      _id: "67c435fc39f1e3a2058c693c",
      name: "Jaiveer",
      phoneNumber: "9549870030",
      moveInDate: "01/August/2024",
      initialLightMeterReading: 5595,
      comments: "Rent - 6000₹\nLight - 10 ₹/unit",
      active: true,
      movedOutDate: null,
      payments: [
        {
          date: "06/August/2024",
          lightMeterReading: 5600,
          rentPaid: 6000,
          lightBillPaid: 0,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "Rent paid 6000rs.",
          _id: "67c43c11daf535039e147bb6",
        },
        {
          date: "06/September/2024",
          lightMeterReading: 5861,
          rentPaid: 6000,
          lightBillPaid: 2000,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "Ok",
          _id: "67c43d0e05a30fb980f58620",
        },
        {
          date: "09/October/2024",
          lightMeterReading: 6093,
          rentPaid: 6000,
          lightBillPaid: 2320,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "Done",
          _id: "67c43d6105a30fb980f58635",
        },
        {
          date: "07/November/2024",
          lightMeterReading: 6225,
          rentPaid: 6000,
          lightBillPaid: 1320,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "Done",
          _id: "67c43dd505a30fb980f5864f",
        },
        {
          date: "06/December/2024",
          lightMeterReading: 6369,
          rentPaid: 6000,
          lightBillPaid: 940,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "For swage cleaning -500 rs ",
          _id: "67c43e5305a30fb980f5866e",
        },
        {
          date: "06/January/2025",
          lightMeterReading: 6369,
          rentPaid: 6000,
          lightBillPaid: 0,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "No light bill and water bill paid ",
          _id: "67c43ea205a30fb980f58692",
        },
        {
          date: "06/February/2025",
          lightMeterReading: 6422,
          rentPaid: 6000,
          lightBillPaid: 530,
          waterBillPaid: 1250,
          paymentMode: "Online",
          onlinePlatform: "PhonePe",
          comments: "Previous month's water bill paid.",
          _id: "67c43ee205a30fb980f586af",
        },
      ],
    },
    {
      _id: "67c4368639f1e3a2058c6948",
      name: "Vikram Lohar",
      phoneNumber: "9509897157",
      moveInDate: "30/October/2024",
      initialLightMeterReading: 4640,
      comments: "Rent - 6500₹\nLight - 10₹/unit\nWife name - Sumita Lohar",
      active: true,
      movedOutDate: null,
      payments: [
        {
          date: "09/November/2024",
          lightMeterReading: 4640,
          rentPaid: 6500,
          lightBillPaid: 0,
          waterBillPaid: 0,
          paymentMode: "Online",
          onlinePlatform: "Paytm",
          comments: "No water and light bill paid",
          _id: "67c43f95c7bfb143968791f3",
        },
        {
          date: "09/December/2024",
          lightMeterReading: 4688,
          rentPaid: 6500,
          lightBillPaid: 400,
          waterBillPaid: 100,
          paymentMode: "Cash",
          onlinePlatform: null,
          comments: "Paid",
          _id: "67c43fb9c7bfb143968791fc",
        },
        {
          date: "06/January/2025",
          lightMeterReading: 4783,
          rentPaid: 6500,
          lightBillPaid: 950,
          waterBillPaid: 100,
          paymentMode: "Cash",
          onlinePlatform: "Paytm",
          comments: "Done",
          _id: "67c443945bd076e8b5500185",
        },
        {
          date: "06/February/2025",
          lightMeterReading: 4902,
          rentPaid: 6500,
          lightBillPaid: 1100,
          waterBillPaid: 100,
          paymentMode: "Online",
          onlinePlatform: "Paytm",
          comments: "Done ",
          _id: "67c444075bd076e8b5500196",
        },
      ],
    },
  ],
};

async function migrateData() {
  try {
    await connectDB();
    console.log("Connected to database");

    // Clear existing collections
    await Renter.deleteMany({});
    await Payment.deleteMany({});
    console.log("Cleared existing collections");

    // Insert renters and their payments
    for (const renterData of sampleData.renters) {
      // Create renter without payments
      const { payments, ...renterInfo } = renterData;
      const renter = await Renter.create(renterInfo);
      console.log(`Created renter: ${renter.name}`);

      // Create payments with renter reference
      for (const paymentData of payments) {
        await Payment.create({
          ...paymentData,
          renterId: renter._id,
        });
      }
      console.log(`Created ${payments.length} payments for ${renter.name}`);
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit();
  }
}

migrateData();
