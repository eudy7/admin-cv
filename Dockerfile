# Etapa 1: Construcción del proyecto Angular
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Copia todo el código fuente del proyecto al contenedor
COPY . .

# Construye el proyecto en modo producción
RUN npm run build -- --configuration production

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copia los archivos generados en la carpeta dist del proyecto Angular al directorio de NGINX
COPY --from=build /app/dist/admin-cv /usr/share/nginx/html

# Exponer el puerto 80 para que sea accesible
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
