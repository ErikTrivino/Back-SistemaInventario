package com.inventory.servicios.interfaces.seguridad;

import com.inventory.modelo.dto.seguridad.UsuarioRequestDTO;
import com.inventory.modelo.dto.seguridad.UsuarioResponseDTO;
import com.inventory.modelo.enums.Rol;

import java.util.List;

/**
 * Interfaz que define las operaciones de gestión de usuarios.
 */
public interface UsuarioServicio {

    UsuarioResponseDTO crearUsuario(UsuarioRequestDTO request);

    UsuarioResponseDTO consultarPorId(Long id);

    UsuarioResponseDTO consultarPorEmail(String email);

    UsuarioResponseDTO actualizarUsuario(Long id, UsuarioRequestDTO request);

    void inactivarUsuario(Long id, String motivo);

    List<UsuarioResponseDTO> filtrarPorSucursal(Long sucursalId);

    List<UsuarioResponseDTO> filtrarPorRol(Rol rol);

    List<UsuarioResponseDTO> buscarPorNombre(String query, Boolean activo);

    String cambiarRol(Long id, Rol nuevoRol) throws Exception;

    org.springframework.data.domain.Page<UsuarioResponseDTO> obtenerUsuarios(org.springframework.data.domain.Pageable pageable);
}
