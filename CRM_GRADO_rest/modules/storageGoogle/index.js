import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const routes = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');
const projectName = process.env.DATABASE_NAME || "general";

// Asegura que la carpeta de destino exista
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(uploadsDir, projectName));

// Configuración de multer para guardar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para subir archivos
routes.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No se subieron archivos.');
    }

    const savedFiles = [];

    for (const file of req.files) {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(uploadsDir, projectName, uniqueFileName);

      fs.writeFileSync(filePath, file.buffer);

      savedFiles.push({
        url: `/uploads/${projectName}/${uniqueFileName}`,
        _id: uniqueFileName,
        name: file.originalname,
        type: file.mimetype
      });
    }

    res.status(200).json(savedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al subir los archivos', error });
  }
});

// Ruta para eliminar archivos
routes.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('No se proporcionó un ID válido.');

    const filePath = path.join(uploadsDir, projectName, id);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).send({ message: `Archivo ${id} eliminado correctamente.` });

    } else {
      return res.status(404).send({ message: `Archivo ${id} no encontrado.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el archivo', error });
  }
});

// Función auxiliar para eliminar múltiples archivos
export async function deleteFiles(files) {
  if (!files || files.length === 0) return;

  for (const fileItem of files) {
    const filePath = path.join(uploadsDir, projectName, fileItem._id);
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (error) {
      console.error(`Error al eliminar archivo: ${fileItem._id}`, error);

    }
  }
}

export default routes;