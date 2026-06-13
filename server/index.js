import express from 'express';
import 'dotenv/config';
import connectDB from './utils/connectDB.js';
const app = express();

app.get('/', (req, res) => {
  res.send('NotePilot is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    // Establish database connection once the server starts
    // listening for incoming requests.
    await connectDB();

    console.log(`Server is running on port ${PORT}`);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to start the application:", error.message);
    process.exit(1);
  }
});