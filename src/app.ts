import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { bookRoutes } from "./routes/book.routes";
import { borrowRoutes } from "./routes/borrow.routes";
import globalErrorHandler from "./middlewars/globalErrorHandler";

const app: Application = express();
dotenv.config();

const corsConfig = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://lmsys-client.vercel.app",
    "http://lmsys-client.vercel.app",
    "https://www.lmsys-client.vercel.app",
    "http://www.lmsys-client.vercel.app",
    "www.lmsys-client.vercel.app",
    "lmsys-client.vercel.app",
    "*",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Middlewares
app.use(express.json());
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  const error = new Error(`Route ${req.originalUrl} not found`);
  (error as any).statusCode = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
