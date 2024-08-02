// scripts/initializeCostPercentages.js
import costPercentages from '../db/Models/costPercentagesModel.js';
import { sequelize } from '../config/config.js';

const initializeCostPercentages = async () => {
  try {
    const count = await costPercentages.count();
    if (count === 0) {
      const defaultValues = {
        twelveInstallments: 2,
        threeInstallments: 2,
        sixInstallments: 2,
        debitOrTransfer: 2,
        naranjaTwelveInstallments: 2,
        naranjaSixInstallments: 2,
        naranjaPlanZThreeInstallments: 2,
        cashPayment: 2,
      };

      await costPercentages.create(defaultValues);
      console.log('Cost percentages initialized successfully.');
    } else {
      console.log('Cost percentages already initialized.');
    }
  } catch (error) {
    console.error('Error initializing cost percentages:', error);
  }
};

export default initializeCostPercentages;
