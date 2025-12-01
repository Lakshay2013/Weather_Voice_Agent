// server.js - minimal secure proxy + static server
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // node-fetch@2
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OWM_API_KEY;

if (!API_KEY) {
  console.error('Missing OWM_API_KEY in .env - add OWM_API_KEY=your_key');
  process.exit(1);
}

// serve static client files from current directory
app.use(express.static(path.join(__dirname, '/')));

// proxy endpoint
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'missing city param' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const r = await fetch(url);
    const data = await r.text(); // get raw text to forward status
    res.status(r.status).type('application/json').send(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running — open http://localhost:${PORT}`));
