import express from 'express';
import { sequelize } from './config/config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import initializeCostPercentages from './scripts/initializeCostPercentages.js';
import initializeCategories from './scripts/initializeCategories.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Asegura que express puede manejar form-data
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/', router);

sequelize.sync({ force: false }) //true para eliminar las existentes y volver a crear.
.then(() => {
  return Promise.all([initializeCostPercentages(), initializeCategories()]); 
})
.then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });