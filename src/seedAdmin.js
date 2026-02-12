require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin user created");
  process.exit();
};

seedAdmin();
