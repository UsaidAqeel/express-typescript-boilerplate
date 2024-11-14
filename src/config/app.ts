import cors from "cors";
import express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { dbConnect } from "@/config/db/db.config";
import userRoutes from "@/modules/users/user.routes";
import morgan from "morgan"

dotenv.config();
const app = express();
dbConnect();

var corsOptions = {
  origin: "*",
};
app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"))

app.use(userRoutes);

export default app;