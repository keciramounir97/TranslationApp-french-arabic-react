import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import dictionaryRoutes from "./routes/dictionaryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de base
app.use(cors());
app.use(express.json());

// Définition des routes de l'API REST
app.use("/api/auth", authRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/dictionary", dictionaryRoutes);

// Route racine pour éviter l'erreur "Cannot GET /" sur Vercel
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Google Traduction Backend API est en ligne !",
    health: "/api/health",
  });
});

// Route de vérification de l'état du serveur
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    appName: "Google Traduction Backend API",
    supportedLanguagesCount: 20,
    timestamp: new Date().toISOString(),
  });
});

// Démarrage du serveur Express (pour environnement local)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Serveur Backend Google Traduction démarré !`);
    console.log(`📡 URL API: http://localhost:${PORT}`);
    console.log(`🌐 20 Langues configurées et prêtes.`);
    console.log(`====================================================`);
  });
}

export default app;
