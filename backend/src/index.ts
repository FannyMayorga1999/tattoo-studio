import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { artistRouter } from "./routes/artist.js";
import { portfolioRouter } from "./routes/portfolio.js";
import { stylesRouter } from "./routes/styles.js";
import { contactRouter } from "./routes/contact.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin.js";
import { appointmentsRouter } from "./routes/appointments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/artist", artistRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/styles", stylesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/appointments", appointmentsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
