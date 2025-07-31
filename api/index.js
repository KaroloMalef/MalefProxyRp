import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST allowed');
    return;
  }

  // Récupère les données envoyées
  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON data' });
      return;
    }
  }

  // Remplace cette URL par l'URL de ton script Google Apps
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TON_URL/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const googleResponse = await response.text();
    res.status(200).json({ ok: true, google: googleResponse });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
