import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Only POST allowed");
    return;
  }

  // Extraire les données de la requête
  let data = req.body;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {}
  }

  // Remplace cette URL par l'URL de ton script Google Apps
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1xHHY2iurnHAF6EBRGIKERPuolzYZDnIw00ZH15chAHnBRRJhG4E5815mpMrikpU9Lw/exec";

  try {
    // Envoie la requête POST vers Google Sheets
    const r = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Récupère la réponse du script
    const response = await r.text();
    res.status(200).json({ ok: true, google: response });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
