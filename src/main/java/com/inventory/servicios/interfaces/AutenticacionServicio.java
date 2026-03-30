package com.inventory.servicios.interfaces;

import com.inventory.modelo.dto.autenticacion.LoginDTO;
import com.inventory.modelo.dto.autenticacion.RegistroUsuarioDTO;
import com.inventory.modelo.dto.autenticacion.TokenDTO;

/**
 * Servicio que define las operaciones de autenticación del sistema de inventario.
 * Patrón análogo al CuentaServicio de Back-EventosClick.
 */
public interface AutenticacionServicio {

    /**
     * Valida las credenciales del usuario y devuelve un token JWT si son correctas.
     *
     * @param loginDTO objeto con correo y contraseña del usuario
     * @return token JWT con claims {rol, nombre, id}
     * @throws Exception si el correo no existe o la contraseña es incorrecta
     */
    TokenDTO iniciarSesion(LoginDTO loginDTO) throws Exception;

    /**
     * Registra un nuevo usuario en el sistema con el rol especificado.
     *
     * @param dto datos del nuevo usuario (nombre, correo, password, rol)
     * @return mensaje de confirmación
     * @throws Exception si el correo ya está registrado
     */
    String registrarUsuario(RegistroUsuarioDTO dto) throws Exception;

    /**
     * RF-37: Cambia el rol de un usuario existente.
     * Solo puede ser ejecutado por un ADMIN.
     *
     * @param id ID del usuario
     * @param nuevoRol rol a asignar
     * @return mensaje de confirmación
     * @throws Exception si el usuario no existe
     */
    String cambiarRol(Long id, com.inventory.modelo.enums.Rol nuevoRol) throws Exception;
}


