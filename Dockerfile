# Etapa 1: Construcción
FROM gradle:8.10-jdk21 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle bootJar -x test --no-daemon

# Etapa 2: Ejecución (Runtime stage)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Exponer el puerto de la aplicación
EXPOSE 8080

# Copiar el JAR desde la etapa de construcción
COPY --from=build /home/gradle/src/build/libs/SistemadeInventario-0.0.1-SNAPSHOT.jar app.jar

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
