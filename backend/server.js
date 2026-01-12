const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);


const app = express();

// Middleware
app.use(cors({
  origin: "https://todo-app-1t27.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/tasks", require("./routes/taskroutes"));
app.use("/api/auth", require("./routes/authroutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./routes/uploadroutes"));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
