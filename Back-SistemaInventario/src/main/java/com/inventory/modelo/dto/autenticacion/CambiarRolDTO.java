package com.inventory.modelo.dto.autenticacion;

import com.inventory.modelo.enums.Rol;
import jakarta.validation.constraints.NotNull;

/** RF-37: DTO para cambiar el rol de un usuario (solo ADMIN). */
public record CambiarRolDTO(
        @NotNull Rol nuevoRol
) {}
