import Product from '../db/Models/productModel.js';
import { Op } from 'sequelize';
export const getProducts = async (req, res) => {
  const { limit, offset, category, name } = req.query;

  try {
    const whereConditions = {};
    if (category) {
      whereConditions.categoria = category;
    }

    if (name) {
      whereConditions.nombre = { [Op.iLike]: `%${name}%` }; 
    }

    const options = {
      where: whereConditions,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    };

    const result = await Product.findAll(options);
    res.json(result);
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).send('Error retrieving products');
  }
};
