require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const seedDonor = async () => {
  const hashedPassword = await bcrypt.hash("donor123", 10);

  await User.create({
    name: "Test Donor",
    email: "donor@test.com",
    password: hashedPassword,
    role: "donor",
  });

  console.log("✅ Donor user created");
  process.exit();
};

seedDonor();