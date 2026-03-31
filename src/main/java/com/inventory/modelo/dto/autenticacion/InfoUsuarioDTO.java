package com.inventory.modelo.dto.autenticacion;

import com.inventory.modelo.enums.Rol;

/**
 * DTO para devolver información de un usuario sin incluir datos sensibles como la contraseña.
 */
public record InfoUsuarioDTO(
        Long id,
        String nombre,
        String apellido,
        String correo,
        Rol rol,
        Long sucursalAsignadaId,
        Boolean activo,
        String motivoInactivacion
) {
}
