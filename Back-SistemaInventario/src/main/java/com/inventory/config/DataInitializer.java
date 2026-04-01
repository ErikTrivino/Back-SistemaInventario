package com.inventory.config;

import com.inventory.modelo.entidades.seguridad.Usuario;
import com.inventory.modelo.enums.Rol;
import com.inventory.repositorios.seguridad.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos que se ejecuta al arrancar la aplicación.
 * Asegura la existencia de un usuario administrador inicial.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepositorio userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existe algún administrador
        if (userRepository.findByRol(Rol.ADMIN).isEmpty()) {
            log.info("Iniciando creación de usuario administrador predeterminado...");

            Usuario admin = Usuario.builder()
                    .nombre("Admin")
                    .apellido("Sistema")
                    .correo("admin@inventario.com")
                    .contrasena(passwordEncoder.encode("admin123"))
                    .rol(Rol.ADMIN)
                    .activo(true)
                    .build();

            userRepository.save(admin);
            
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            log.info("USUARIO ADMINISTRADOR CREADO:");
            log.info("Email: admin@inventario.com");
            log.info("Clave: admin123");
            log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        } else {
            log.info("El sistema ya cuenta con usuarios administradores.");
        }
    }
}
