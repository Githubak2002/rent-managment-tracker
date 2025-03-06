import { connectDB } from "../lib/db";
import Renter from "../models/renter.model";
import Payment from "../models/payment.model";
import mongoose from "mongoose";

async function migratePayments() {
  try {
    console.log("Starting migration...");
    await connectDB();

    // Get all renters with their payments
    const renters = await mongoose.connection.db
      .collection("renters")
      .find({})
      .toArray();

    console.log(`Found ${renters.length} renters to process`);

    let totalPayments = 0;
    const migratedPayments = [];

    // Process each renter
    for (const renter of renters) {
      if (renter.payments && renter.payments.length > 0) {
        console.log(
          `Processing ${renter.payments.length} payments for renter ${renter.name}`
        );

        // Convert each payment to the new format
        const payments = renter.payments.map((payment) => ({
          renterId: renter._id,
          date: payment.date,
          lightMeterReading: payment.lightMeterReading,
          rentPaid: payment.rentPaid,
          lightBillPaid: payment.lightBillPaid,
          waterBillPaid: payment.waterBillPaid,
          paymentMode: payment.paymentMode,
          onlinePlatform: payment.onlinePlatform,
          comments: payment.comments,
        }));

        migratedPayments.push(...payments);
        totalPayments += payments.length;
      }
    }

    // Insert all payments in bulk
    if (migratedPayments.length > 0) {
      await Payment.insertMany(migratedPayments);
    }

    // Remove payments array from renters
    await mongoose.connection.db
      .collection("renters")
      .updateMany({}, { $unset: { payments: "" } });

    console.log(`Migration completed successfully!`);
    console.log(`Total payments migrated: ${totalPayments}`);
    console.log(`Total renters processed: ${renters.length}`);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the migration
migratePayments();
