import express from "express";
import cors from "cors";
import prices from "./api/prices.route.js";

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/v1/prices", prices);
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;