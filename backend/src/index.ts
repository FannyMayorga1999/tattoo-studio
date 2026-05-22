import express from "express";
import cors from "cors";
import { artistRouter } from "./routes/artist.js";
import { portfolioRouter } from "./routes/portfolio.js";
import { stylesRouter } from "./routes/styles.js";
import { contactRouter } from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/artist", artistRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/styles", stylesRouter);
app.use("/api/contact", contactRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
