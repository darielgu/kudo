import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import morgan from "morgan";
app.use(express.json());
app.use(morgan("dev"));
import boardRoutes from "./src/routes/boardRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";

app.use("/board", boardRoutes);
app.use("/card", cardRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})