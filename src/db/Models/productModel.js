import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/config.js'; 

const PRODUCTS_TABLE = 'products';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    description: 'Firebase document ID',
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    description: 'Nombre del producto',
    validate: {
      notEmpty: {
        msg: 'El nombre es requerido.',
      },
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\-_\. ]*$/,
        msg: 'No se permiten caracteres especiales.',
      },
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'La cantidad debe ser mayor o igual a 0.',
      },
      isInt: {
        msg: 'La cantidad debe ser un número entero.',
      },
    },
    description: 'Cantidad disponible',
  },
  medidas: {
    type: DataTypes.JSON,
    allowNull: true,
    description: 'Medidas del producto (ancho, altura, profundidad)',
    validate: {
      isValidMeasures(value) {
        if (value) {
          const { alto, ancho, profundidad } = value;
          const numberPattern = /^\d*$/;
          if (alto && !numberPattern.test(alto)) {
            throw new Error('Las medidas deben ser números.');
          }
          if (ancho && !numberPattern.test(ancho)) {
            throw new Error('Las medidas deben ser números.');
          }
          if (profundidad && !numberPattern.test(profundidad)) {
            throw new Error('Las medidas deben ser números.');
          }
        }
      },
    },
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    description: 'Categorías del producto',
    validate: {
      notEmpty: {
        msg: 'La categoría es requerida.',
      },
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\-_\. ]*$/,
        msg: 'No se permiten caracteres especiales.',
      },
    },
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true,
    description: 'Material del producto',
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/,
        msg: 'Solo se permiten letras y espacios.',
      },
    },
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    description: 'Color del producto',
    validate: {
      is: {
        args: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/,
        msg: 'Solo se permiten letras y espacios.',
      },
    },
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'El precio debe ser mayor a 0.',
      },
      isFloat: {
        msg: 'El precio debe ser un número válido.',
      },
    },
    description: 'Precio del producto',
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true,
    description: 'URL de la imagen del producto',
    validate: {
      isUrl: {
        msg: 'La URL de la imagen no es válida.',
      },
    },
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: PRODUCTS_TABLE,
  timestamps: false,
});

export default Product;
