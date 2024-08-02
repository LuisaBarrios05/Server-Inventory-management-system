import Product from '../db/Models/productModel.js';
import costPercentages from '../db/Models/costPercentagesModel.js'; // Ajusta la ruta según sea necesario


export const getDetailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Retrieving product details for product with ID ${id}`);

    // Obtener el producto por ID
    const product = await Product.findByPk(id);
    if (!product) {
      console.warn(`Product ${id} not found`);
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(`Product ${id} retrieved successfully`);

    // Obtener la configuración de costos
    console.log('Retrieving config for costs');
    const costs = await costPercentages.findOne();
    if (costs.length === 0) {
      console.warn('No cost percentages found');
      return res.status(404).json({ error: 'No cost percentages found' });
    }
    const costsConfig = costs.toJSON();
    console.log('Config for costs retrieved successfully', { costsConfig });

    // Calcular precios basados en los costos
    const price = product.precio;
    const productDetails = {
      product: product.toJSON(),
      "Débito o transferencia": parseFloat((price - price * (costsConfig.debitOrTransfer / 100)).toFixed(2)),
      "3 Cuotas": parseFloat((price + price * (costsConfig.threeInstallments / 100)).toFixed(2)),
      "6 Cuotas": parseFloat((price + price * (costsConfig.sixInstallments / 100)).toFixed(2)),
      "12 Cuotas": parseFloat((price + price * (costsConfig.twelveInstallments / 100)).toFixed(2)),
      "Naranja 3 Cuotas": parseFloat((price + price * (costsConfig.naranjaPlanZThreeInstallments / 100)).toFixed(2)),
      "Naranja 6 Cuotas": parseFloat((price + price * (costsConfig.naranjaSixInstallments / 100)).toFixed(2)),
      "Naranja 12 Cuotas": parseFloat((price + price * (costsConfig.naranjaTwelveInstallments / 100)).toFixed(2)),
      "Efectivo": parseFloat((price - price * (costsConfig.cashPayment / 100)).toFixed(2)),
    };

    console.log(`Product details for product ${id} calculated successfully`);
    return res.json(productDetails);
  } catch (error) {
    console.error(`Error retrieving product details: ${error.message}`);
    return res.status(500).json({ error: 'Error retrieving product details' });
  }
};
