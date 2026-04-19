import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Шляхи
const DB_PATH      = path.join(__dirname, 'db.json');
const UPLOADS_DIR  = path.join(__dirname, 'public', 'images');

// Якщо папки немає — створити
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(UPLOADS_DIR));

// Multer — зберігає файл у public/images/ з оригінальним іменем
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = `item-${req.params.id}-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// --- Хелпери для db.json ---
function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ================================================
//  GET /inventory — список всіх
// ================================================
app.get('/inventory', (req, res) => {
  const db = readDb();
  res.json(db.inventory);
});

// ================================================
//  GET /inventory/:id — один товар
// ================================================
app.get('/inventory/:id', (req, res) => {
  const db   = readDb();
  const item = db.inventory.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Не знайдено' });
  res.json(item);
});

// ================================================
//  POST /register — створити товар (multipart/form-data)
// ================================================
app.post('/register', upload.single('photo'), (req, res) => {
  const db = readDb();
  const newItem = {
    id:             db.inventory.length ? Math.max(...db.inventory.map(i => i.id)) + 1 : 1,
    inventory_name: req.body.inventory_name,
    description:    req.body.description || '',
    photo:          req.file ? `/images/${req.file.filename}` : null,
  };
  db.inventory.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// ================================================
//  PUT /inventory/:id — оновити текстові дані (JSON)
// ================================================
app.put('/inventory/:id', (req, res) => {
  const db   = readDb();
  const idx  = db.inventory.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Не знайдено' });

  const { inventory_name, description } = req.body;
  if (inventory_name !== undefined) db.inventory[idx].inventory_name = inventory_name;
  if (description    !== undefined) db.inventory[idx].description    = description;

  writeDb(db);
  res.json(db.inventory[idx]);
});

// ================================================
//  PUT /inventory/:id/photo — оновити фото (multipart/form-data)
// ================================================
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const db  = readDb();
  const idx = db.inventory.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Не знайдено' });
  if (!req.file)  return res.status(400).json({ error: 'Файл не надіслано' });

  // Видалити старе фото якщо є
  const oldPhoto = db.inventory[idx].photo;
  if (oldPhoto) {
    const oldPath = path.join(__dirname, 'public', oldPhoto);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  db.inventory[idx].photo = `/images/${req.file.filename}`;
  writeDb(db);
  res.json(db.inventory[idx]);
});

// ================================================
//  DELETE /inventory/:id — видалити товар
// ================================================
app.delete('/inventory/:id', (req, res) => {
  const db  = readDb();
  const idx = db.inventory.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Не знайдено' });

  // Видалити фото з диску
  const photo = db.inventory[idx].photo;
  if (photo) {
    const photoPath = path.join(__dirname, 'public', photo);
    if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
  }

  db.inventory.splice(idx, 1);
  writeDb(db);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));