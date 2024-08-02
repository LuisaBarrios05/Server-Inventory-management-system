// node src/scripts/initializeCategories.js

import Category from '../db/Models/categoriesModel.js';
import { sequelize } from '../config/config.js'; 

const initializeCategories = async () => {
  const categories = [
    { id: '1', name: 'Electrodomésticos' },
    { id: '2', name: 'Muebles' },
    { id: '3', name: 'Comedor' },
    { id: '4', name: 'Living' },
    { id: '5', name: 'Bases' },
    { id: '6', name: 'Colchones' },
    { id: '7', name: 'Deco' },
    { id: '8', name: 'Combos' }
  ];

  try {
    const count = await Category.count();
    if (count === 0) {
      for (const category of categories) {
        await Category.create(category);
      }
      console.log('Categories initialized successfully.');
    } else {
      console.log('Categories already initialized.');
    }
  } catch (error) {
    console.error('Error initializing categories:', error);
  }
};

export default initializeCategories;
