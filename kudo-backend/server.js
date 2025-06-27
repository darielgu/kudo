import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import morgan from "morgan";
app.use(express.json());
app.use(morgan("dev"));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})