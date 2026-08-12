const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir la galería estática
app.use(express.static(path.join(__dirname, 'public')));

// Healthcheck para Railway
app.get('/health', (_req, res) => res.json({ ok: true, service: 'chatbots-leao' }));

// Cualquier ruta -> index (SPA-friendly)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Galería Chatbots LEAO en puerto ${PORT}`));
