package com.inventory.servicios.implementaciones.seguridad;

import com.inventory.modelo.entidades.seguridad.Usuario;
import com.inventory.repositorios.seguridad.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Servicio personalizado que implementa {@link UserDetailsService} para
 * integrar el sistema con Spring Security y evitar la generación de passwords por defecto.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepositorio usuarioRepositorio;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByCorreo(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));

        if (!usuario.getActivo()) {
            throw new UsernameNotFoundException("La cuenta del usuario está inactiva.");
        }

        return new User(
                usuario.getCorreo(),
                usuario.getContrasena(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()))
        );
    }
}
