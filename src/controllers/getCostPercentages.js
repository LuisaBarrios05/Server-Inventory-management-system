import costPercentages from '../db/Models/costPercentagesModel.js';
export const getCostPercentages = async (req, res) => {
  try {
    // Obtener la primera fila de la tabla
    const costPercentage = await costPercentages.findOne();

    if (!costPercentage) {
      return res.status(404).json({ message: 'No se encontraron datos en la tabla de porcentajes de costos' });
    }

    const response = {
      "Débito o transferencia": costPercentage.debitOrTransfer,
      "3 Cuotas": costPercentage.threeInstallments,
      "6 Cuotas": costPercentage.sixInstallments,
      "12 Cuotas": costPercentage.twelveInstallments,
      "Naranja 3 Cuotas": costPercentage.naranjaPlanZThreeInstallments,
      "Naranja 6 Cuotas": costPercentage.naranjaSixInstallments,
      "Naranja 12 Cuotas": costPercentage.naranjaTwelveInstallments,
      "Efectivo": costPercentage.cashPayment
    };

    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    console.error('Error al obtener los porcentajes de costos:', error);
    res.status(500).json({ message: 'Error al obtener los porcentajes de costos' });
  }
};
