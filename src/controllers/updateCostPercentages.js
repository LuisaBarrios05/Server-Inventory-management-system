import costPercentages from '../db/Models/costPercentagesModel.js'; 
import { validationResult } from 'express-validator';

export const updateCostPercentages = async (req, res) => {
  const id = "1";

  try {
    // Validar errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraer los datos del cuerpo de la solicitud
    // Obtener el registro existente
    const costPercentage = await costPercentages.findByPk(id);
    if (!costPercentage) {
      return res.status(404).json({ message: 'Cost percentage record not found' });
    }

    // Actualizar los datos
    costPercentage.twelveInstallments = req.body['12 Cuotas'] !== undefined ? req.body['12 Cuotas'] : costPercentage.twelveInstallments;
    costPercentage.threeInstallments = req.body['3 Cuotas'] !== undefined ? req.body['3 Cuotas'] : costPercentage.threeInstallments;
    costPercentage.sixInstallments = req.body['6 Cuotas'] !== undefined ? req.body['6 Cuotas'] : costPercentage.sixInstallments;
    costPercentage.debitOrTransfer = req.body['Débito o transferencia'] !== undefined ? req.body['Débito o transferencia'] : costPercentage.debitOrTransfer;
    costPercentage.naranjaTwelveInstallments = req.body['Naranja 12 Cuotas'] !== undefined ? req.body['Naranja 12 Cuotas'] : costPercentage.naranjaTwelveInstallments;
    costPercentage.naranjaSixInstallments = req.body['Naranja 6 Cuotas'] !== undefined ? req.body['Naranja 6 Cuotas'] : costPercentage.naranjaSixInstallments;
    costPercentage.naranjaPlanZThreeInstallments = req.body['Naranja 3 Cuotas'] !== undefined ? req.body['Naranja 3 Cuotas'] : costPercentage.naranjaPlanZThreeInstallments;
    costPercentage.cashPayment = req.body.Efectivo !== undefined ? req.body.Efectivo : costPercentage.cashPayment;

    // Guardar los cambios
    await costPercentage.save();

    // Enviar la respuesta con el registro actualizado
    res.status(200).json(costPercentage);
  } catch (error) {
    console.error('Error updating cost percentage:', error);
    res.status(500).json({ message: 'Error updating cost percentage' });
  }
};
