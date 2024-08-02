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

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/products", getProducts);
router.get("/detail/:id", getDetailProduct);
router.get('/cost-percentages', getCostPercentages);
router.post("/create", upload.single('imagen'), createProduct);
router.post('/post-cost', postCostPercentages);
router.put('/update-product/:id', upload.single('imagen'), updateProduct);
router.put('/update-cost-percentage/', updateCostPercentages);
router.put('/update-cost-categories/', updateCostCategories);
router.delete('/delete-product/:id', deleteProduct);

export default router;
