import Product from '../db/Models/productModel.js'; 
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

//Google Cloud Storage
const storage = new Storage({
  projectId: process.env.PROJECT_ID_GC,
  keyFilename: process.env.ACCOUNT_SERVICE_GC
});
const bucketName = process.env.BUCKET_NAME_GC;
const bucket = storage.bucket(bucketName);

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { nombre, categoria, material, cantidad, medidas_alto, medidas_ancho, medidas_profundidad, color, precio } = req.body;
  let imagen_url = null;

  const updateProductData = async () => {
    // Obtener el producto existente
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let medidasObj = {
      alto: medidas_alto || product.medidas?.alto || '',
      ancho: medidas_ancho || product.medidas?.ancho || '',
      profundidad: medidas_profundidad || product.medidas?.profundidad || '',
    };

    // Actualizar el producto
    product.nombre = nombre || product.nombre;
    product.categoria = categoria || product.categoria;
    product.material = material || product.material;
    product.cantidad = cantidad !== undefined ? parseInt(cantidad, 10) : product.cantidad;
    product.medidas = medidasObj;
    product.color = color || product.color;
    product.precio = precio !== undefined ? parseFloat(precio) : product.precio;
    if (imagen_url) {
      product.imagen_url = imagen_url;
    }

    await product.save();

    res.status(200).json(product);
  };

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    

    // Subir la imagen a Google Cloud Storage si se proporciona una nueva imagen
    if (req.file) {
      const { originalname, buffer } = req.file;
      const blob = bucket.file(`products_images/${uuidv4()}_${originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('finish', async () => {
        imagen_url = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        await updateProductData();
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading image:', err);
        res.status(500).json({ message: 'Error uploading image' });
      });

      blobStream.end(buffer);
    } else {
      await updateProductData();
    }

    
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};
