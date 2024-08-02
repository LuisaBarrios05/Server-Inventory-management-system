import express from 'express';
import multer from 'multer';
import { getProducts } from '../controllers/getAllProducts.js';
import { getDetailProduct } from '../controllers/getDetail.js';
import { getCostPercentages } from '../controllers/getCostPercentages.js';
import { createProduct } from '../controllers/postProduct.js';
import { postCostPercentages } from '../controllers/postCostPercentages.js';
import { updateProduct } from '../controllers/updateProduct.js';
import { updateCostPercentages } from '../controllers/updateCostPercentages.js';
import { deleteProduct } from '../controllers/deleteProduct.js';
import { updateCostCategories } from '../controllers/updatePercentagesCategories.js';
import {authMiddleware, checkRole} from '../middleware/authMiddleware.js'

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/products", authMiddleware, getProducts);
router.get("/detail/:id", authMiddleware, getDetailProduct);
router.get('/cost-percentages', authMiddleware , getCostPercentages);
router.post("/create", authMiddleware, checkRole('Admin'), upload.single('imagen'), createProduct);
router.post('/post-cost', authMiddleware, checkRole('Admin'), postCostPercentages);
router.put('/update-product/:id', authMiddleware, checkRole('Admin'), upload.single('imagen'), updateProduct);
router.put('/update-cost-percentage/', authMiddleware, checkRole('Admin'), updateCostPercentages);
router.put('/update-cost-categories/', authMiddleware, checkRole('Admin'), updateCostCategories);
router.delete('/delete-product/:id', authMiddleware, checkRole('Admin'), deleteProduct);

export default router;
