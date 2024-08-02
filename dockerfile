# Usa una imagen base oficial de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que usa la aplicación (por defecto 8080 para Google Cloud Run)
EXPOSE 3000

# Define la variable de entorno para el puerto
ENV PORT 3000

# Inicia la aplicación
CMD ["npm", "start"]
