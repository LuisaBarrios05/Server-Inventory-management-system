import Product from '../db/Models/productModel.js'; 
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

// Configurar Google Cloud Storage
if (process.env.ENV === 'prod' || process.env.ENV === '') {
  // En producción, utiliza las credenciales predeterminadas de la aplicación
  storage = new Storage({
    projectId: process.env.PROJECT_ID_GC
  });
} else {
  // En desarrollo, utiliza el archivo de clave de servicio
  storage = new Storage({
    projectId: process.env.PROJECT_ID_GC,
    keyFilename: process.env.ACCOUNT_SERVICE_GC
  });}

const bucketName = process.env.BUCKET_NAME_GC;
const bucket = storage.bucket(bucketName);

const upload = multer({ storage: multer.memoryStorage() });

export const createProduct = async (req, res) => {
  try {
    const saveProduct = async () => {
      // Validar y convertir medidas a objeto JSON
      let medidasObj;
      try {
        medidasObj = medidas ? JSON.parse(medidas) : null;
      } catch (parseError) {
        return res.status(400).json({ message: 'Medidas debe ser un JSON válido' });
      }

      // Crear el nuevo producto
      const newProduct = await Product.create({
        id: uuidv4(),
        nombre: nombre || null,
        categoria: categoria || null,
        material: material || null,
        cantidad: parseInt(cantidad, 10) || null,
        medidas: medidasObj,
        color: color || null,
        precio: parseFloat(precio) || null,
        imagen_url,
      });

      // Enviar la respuesta con el producto creado
      res.status(201).json(newProduct);
    };

    // Validar errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraer los datos del cuerpo de la solicitud
    const { nombre, categoria, material, cantidad, medidas, color, precio } = req.body;
    console.log(req.body); // Añade este log para verificar el contenido del body
    let imagen_url = null;

    // Subir la imagen a Google Cloud Storage
    if (req.file) {
      const { originalname, buffer } = req.file;
      const blob = bucket.file(`products_images/${uuidv4()}_${originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('finish', async () => {
        imagen_url = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        await saveProduct();
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading image:', err);
        res.status(500).json({ message: 'Error uploading image' });
      });

      blobStream.end(buffer);
    } else {
      await saveProduct();
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};
