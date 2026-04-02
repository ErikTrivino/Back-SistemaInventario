package com.inventory.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Implementación de PasswordEncoder utilizando la clase estándar de Spring Security Crypto.
 * Aunque hemos eliminado el starter completo de seguridad, utilizamos esta librería
 * solo para el hashing de contraseñas por su robustez y simplicidad.
 */
@Component("customBCryptPasswordEncoder")
public class BCryptPasswordEncoderImpl implements PasswordEncoder {

    private final BCryptPasswordEncoder delegate = new BCryptPasswordEncoder();

    @Override
    public String encode(String rawPassword) {
        // Utiliza la implementación de Spring para encriptar la contraseña
        return delegate.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        // Utiliza la implementación de Spring para verificar la contraseña
        try {
            return delegate.matches(rawPassword, encodedPassword);
        } catch (Exception e) {
            return false;
        }
    }
}
