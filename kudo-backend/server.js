import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import morgan from "morgan";
app.use(express.json());
app.use(morgan("dev"));
import boardRoutes from "./src/routes/boardRoutes.js";

app.use("/board", boardRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})