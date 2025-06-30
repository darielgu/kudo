import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;
import morgan from "morgan";
import cors from "cors"; //need cors for FrontEnd connection
const corsOptions = {
  origin: `http://localhost:${FRONTEND}`, // Allow requests from FrontEnd port
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
import boardRoutes from "./src/routes/boardRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";

app.use("/board", boardRoutes);
app.use("/card", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
