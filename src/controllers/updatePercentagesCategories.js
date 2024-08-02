import Category from '../db/Models/categoriesModel.js';
import Product from '../db/Models/productModel.js';

export const updateCostCategories = async (req, res) => {
  const { percentage, category, action } = req.body;

  if (!percentage || !category || !action) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const increment = action === 'aumentar';

  try {
    // Verifica que la categoría exista
    const categoryToUpdate = await Category.findOne({ where: { name: category } });

    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    // Actualiza el precio de los productos en la categoría
    const products = await Product.findAll({ where: { categoria: category } });

    for (const product of products) {
      const priceChange = product.precio * (percentage / 100);
      product.precio = increment ? product.precio + priceChange : product.precio - priceChange;
      await product.save();
    }

    res.status(200).json({ message: 'Precios actualizados correctamente.' });
  } catch (error) {
    console.error('Error updating prices:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar los precios.' });
  }
};
