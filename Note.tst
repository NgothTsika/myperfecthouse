const position = [51.505, -0.09]
        
render(
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)
for react leaflet


#Folder Structure Example if using alternative to cloudinary
project-root/
│
├── uploads/             # <-- Images will be saved here
├── src/
│   └── routes/
│       └── upload.ts    # <-- Image upload route
│
├── prisma/
│   └── schema.prisma
├── .env
└── ...


// src/routes/upload.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const { filename, path: filePath, mimetype, size } = req.file;

  const image = await prisma.image.create({
    data: {
      filename,
      path: filePath,
      mimetype,
      size,
    },
  });

  res.json({ message: 'Image uploaded', image });
});

export default router;


# Serve the Uploaded Files
app.use('/uploads', express.static('uploads'));

#Then you can access images via:
http://localhost:3000/uploads/<filename>

