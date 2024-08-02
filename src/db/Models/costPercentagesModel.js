import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/config.js'; 

const COST_PERCENTAGES_TABLE = 'cost_Percentages';

class costPercentages extends Model {}

costPercentages.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  twelveInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "12 cuotas" debe ser un número entero.',
      },
    },
    field: '12_cuotas',
  },
  threeInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "3 cuotas" debe ser un número entero.',
      },
    },
    field: '3_cuotas',
  },
  sixInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "6 cuotas" debe ser un número entero.',
      },
    },
    field: '6_cuotas',
  },
  debitOrTransfer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "Debito o Transferencia" debe ser un número entero.',
      },
    },
    field: 'debito_transferencia',
  },
  naranjaTwelveInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "Naranja - 12 cuotas" debe ser un número entero.',
      },
    },
    field: 'naranja_12_cuotas',
  },
  naranjaSixInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "Naranja - 6 cuotas" debe ser un número entero.',
      },
    },
    field: 'naranja_6_cuotas',
  },
  naranjaPlanZThreeInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "Naranja - Plan Z 3 cuotas" debe ser un número entero.',
      },
    },
    field: 'naranja_plan_z_3_cuotas',
  },
  cashPayment: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El valor de "Pago al contado" debe ser un número entero.',
      },
    },
    field: 'pago_contado',
  },
}, {
  sequelize,
  modelName: 'costPercentages',
  tableName: COST_PERCENTAGES_TABLE,
  timestamps: false,
});

export default costPercentages;
