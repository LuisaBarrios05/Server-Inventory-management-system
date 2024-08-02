import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/config.js'; 

const CATEGORIES_TABLE = 'categories';

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    description: 'Firebase document ID',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    description: 'Nombre de la categoría',
    validate: {
      notEmpty: {
        msg: 'El nombre de la categoría es requerido.',
      },
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\-_\. ]*$/,
        msg: 'No se permiten caracteres especiales.',
      },
    },
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: CATEGORIES_TABLE,
  timestamps: false,
});

export default Category;
