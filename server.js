const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Leemos el index una vez en memoria (para servirlo como 200 completo)
const indexPath = path.join(__dirname, 'public', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// Servir la galería estática, PERO sin aceptar "rangos" (evita el 206)
app.use(express.static(path.join(__dirname, 'public'), {
  acceptRanges: false
}));

// Healthcheck para Railway
app.get('/health', (_req, res) => res.json({ ok: true, service: 'chatbots-leao' }));

// Cualquier ruta -> index, enviado como 200 completo (SPA-friendly)
app.get('*', (_req, res) => {
  res.status(200).type('html').send(indexHtml);
});

app.listen(PORT, () => console.log(`Galería Chatbots LEAO en puerto ${PORT}`));
