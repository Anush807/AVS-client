require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const seedBeneficiary = async () => {
  try {
    // Check if already exists (prevents duplicates)
    const existingUser = await User.findOne({
      email: "beneficiary@test.com",
    });

    if (existingUser) {
      console.log("⚠️ Beneficiary already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("beneficiary123", 10);

    await User.create({
      name: "Test Beneficiary",
      email: "beneficiary@test.com",
      password: hashedPassword,
      role: "beneficiary",
      points: 0,
      badge: "None",
    });

    console.log("✅ Beneficiary user created");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding beneficiary:", error);
    process.exit(1);
  }
};

seedBeneficiary();