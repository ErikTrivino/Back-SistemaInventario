# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Producción
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
# La ruta dist/sistema-inventario/browser es la estándar para Angular 17+ con el builder 'application'
COPY --from=build /app/dist/sistema-inventario/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
