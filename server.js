const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const app = require("./app");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Set port
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
