import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import dayRoutes from "./routes/day.js";
import trailersRoutes from "./routes/trailers.js";
import optionsRoutes from "./routes/options.js";
import cookieParser from "cookie-parser";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceKey from "./serviceKey.json" assert { type: "json" };
import { checkAuth } from "./middleware/checkAuth.js";

const firebase = initializeApp({
  credential: admin.credential.cert(serviceKey),
});

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "https://warehouse-planning-tool.onrender.com/",
    credentials: true,
  })
);

// Routes
app.use("/day", dayRoutes);
app.use("/", checkAuth, trailersRoutes);
app.use("/options", checkAuth, optionsRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
