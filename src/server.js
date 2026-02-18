const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const testRoute = require("./routes/testRoutes");
const campaignRoute = require("./routes/campaignRoutes");
const donationRoute = require("./routes/donationRoute");
const benificieryRoute = require("./routes/benificieryRoute");
const volunteerRoute = require("./routes/volunteerRoute");
const dasboardRoute = require("./routes/dashboardRoute");
const userRoute = require("./routes/userRoute"); 

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
// In production, VITE_API_URL will be your frontend URL
// In development, it allows all origins
const corsOptions = {
  origin: process.env.VITE_API_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running 🚀",
    status: "healthy",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/campaigns", campaignRoute);
app.use("/api/donations", donationRoute);
app.use("/api/beneficiary", benificieryRoute);
app.use("/api/volunteer", volunteerRoute);
app.use("/api/dashboard", dasboardRoute);
app.use("/api/users", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});