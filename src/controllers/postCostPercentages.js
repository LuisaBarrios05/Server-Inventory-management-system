import costPercentages from '../db/Models/costPercentagesModel.js'; 
import { validationResult } from 'express-validator';

export const postCostPercentages = async (req, res) => {
  try {
    // Validar errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraer los datos del cuerpo de la solicitud
    const {
      twelveInstallments,
      threeInstallments,
      sixInstallments,
      debitOrTransfer,
      naranjaTwelveInstallments,
      naranjaSixInstallments,
      naranjaPlanZThreeInstallments,
      cashPayment,
    } = req.body;

    // Crear un nuevo registro en la tabla costPercentages
    const newCostPercentage = await costPercentages.create({
      twelveInstallments: parseInt(twelveInstallments, 10),
      threeInstallments: parseInt(threeInstallments, 10),
      sixInstallments: parseInt(sixInstallments, 10),
      debitOrTransfer: parseInt(debitOrTransfer, 10),
      naranjaTwelveInstallments: parseInt(naranjaTwelveInstallments, 10),
      naranjaSixInstallments: parseInt(naranjaSixInstallments, 10),
      naranjaPlanZThreeInstallments: parseInt(naranjaPlanZThreeInstallments, 10),
      cashPayment: parseInt(cashPayment, 10),
    });

    // Enviar la respuesta con el nuevo registro creado
    res.status(201).json(newCostPercentage);
  } catch (error) {
    console.error('Error adding cost percentage:', error);
    res.status(500).json({ message: 'Error adding cost percentage' });
  }
};
