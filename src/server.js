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

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/test", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/campaigns", campaignRoute);
app.use("/api/donations", donationRoute);
app.use("/api/beneficiary", benificieryRoute);
app.use("/api/volunteer", volunteerRoute);
app.use("/api/dashboard", dasboardRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
