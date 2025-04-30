import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders:[
        "content-Type",
        "Authorization",
        "Cache-Control",
        "Expries",
        "Pragma"
    ],
    credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`server started on port: ${PORT}`);
})