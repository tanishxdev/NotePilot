import express from 'express';
import 'dotenv/config';
import connectDB from './utils/connectDB.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests

  })
);

app.use(express.json());
app.use(cookieParser());
// Define a simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('NotePilot is running!');
});

// Mount the authRouter to handle authentication-related routes
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    // Establish database connection once the server starts
    // listening for incoming requests.
    await connectDB();

    console.log(`Server is running on port ${PORT}`);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to start the application:', error.message);
    process.exit(1);
  }
});
