package com.inventory.config;

/**
 * Interfaz personalizada para el cifrado de contraseñas,
 * reemplazando la versión de Spring Security.
 */
public interface PasswordEncoder {
    String encode(String rawPassword);
    boolean matches(String rawPassword, String encodedPassword);
}
