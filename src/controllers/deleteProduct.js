import Product from '../db/Models/productModel.js';

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Eliminar el producto
    await product.destroy();

    // Enviar la respuesta con un mensaje de éxito
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
