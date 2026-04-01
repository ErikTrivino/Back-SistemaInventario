package com.inventory.repositorios.seguridad;

import com.inventory.modelo.entidades.seguridad.Usuario;
import com.inventory.modelo.enums.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su correo electrónico.
     */
    Optional<Usuario> findByCorreo(String correo);

    /**
     * Filtra usuarios por sucursal persistida (RF-58).
     */
    List<Usuario> findBySucursalAsignadaId(Long id);

    /**
     * Filtra usuarios por rol (RF-59).
     */
    List<Usuario> findByRol(Rol rol);

    /**
     * Busca por coincidencia de texto en nombre o apellido (RF-60).
     */
    List<Usuario> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);

    /**
     * Filtrado adicional por estado.
     */
    List<Usuario> findByActivo(Boolean activo);
}
