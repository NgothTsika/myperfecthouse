

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


Add this to your Prisma schema:
model Image {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  url        String   // Cloudinary secure_url
  publicId   String   // Cloudinary public_id
  format     String?  // jpg, png, etc.
  width      Int?
  height     Int?
  bytes      Int?     // file size in bytes
  createdAt  DateTime @default(now())

  // Optionally link to a user or listing
  listingId  String?  @db.ObjectId
  listing    Listing? @relation(fields: [listingId], references: [id], onDelete: Cascade)

  userId     String?  @db.ObjectId
  user       User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
🔁 After upload to Cloudinary, you’d do something like:
const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
  folder: "my-app/listings",
});

await prisma.image.create({
  data: {
    url: cloudinaryResponse.secure_url,
    publicId: cloudinaryResponse.public_id,
    format: cloudinaryResponse.format,
    width: cloudinaryResponse.width,
    height: cloudinaryResponse.height,
    bytes: cloudinaryResponse.bytes,
    listingId: listingId, // optional
    userId: userId,       // optional
  },
});
