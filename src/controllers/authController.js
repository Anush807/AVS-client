const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Login (existing)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points,
        badge: user.badge,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Register Donor
exports.registerDonor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create donor
    const donor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "donor",
      points: 0,
      badge: "None",
    });

    // Generate token
    const token = generateToken(donor._id, donor.role);

    res.status(201).json({
      message: "Donor registered successfully",
      token,
      user: {
        id: donor._id,
        name: donor.name,
        email: donor.email,
        role: donor.role,
        points: donor.points,
        badge: donor.badge,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Register Beneficiary
exports.registerBeneficiary = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create beneficiary
    const beneficiary = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "beneficiary",
      points: 0,
      badge: "None",
    });

    // Generate token
    const token = generateToken(beneficiary._id, beneficiary.role);

    res.status(201).json({
      message: "Beneficiary registered successfully",
      token,
      user: {
        id: beneficiary._id,
        name: beneficiary.name,
        email: beneficiary.email,
        role: beneficiary.role,
        points: beneficiary.points,
        badge: beneficiary.badge,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Register Volunteer
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create volunteer
    const volunteer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "volunteer",
      points: 0,
      badge: "None",
    });

    // Generate token
    const token = generateToken(volunteer._id, volunteer.role);

    res.status(201).json({
      message: "Volunteer registered successfully",
      token,
      user: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        role: volunteer.role,
        points: volunteer.points,
        badge: volunteer.badge,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};