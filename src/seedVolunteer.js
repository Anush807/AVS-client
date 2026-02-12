require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const seedVolunteer = async () => {
  try {
    const existingUser = await User.findOne({
      email: "volunteer@test.com",
    });

    if (existingUser) {
      console.log("⚠️ Volunteer already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("volunteer123", 10);

    await User.create({
      name: "Test Volunteer",
      email: "volunteer@test.com",
      password: hashedPassword,
      role: "volunteer",
      points: 0,
      badge: "None",
    });

    console.log("✅ Volunteer user created");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding volunteer:", error);
    process.exit(1);
  }
};

seedVolunteer();