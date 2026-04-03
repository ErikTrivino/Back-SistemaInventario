package com.inventory.modelo.entidades.seguridad;

import com.inventory.modelo.enums.Rol;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class ConversorRol implements AttributeConverter<Rol, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Rol rol) {
        if (rol == null) {
            return null;
        }
        return switch (rol) {
            case ADMIN -> 1;
            case GERENTE -> 2;
            case OPERADOR -> 3;
        };
    }

    @Override
    public Rol convertToEntityAttribute(Integer roleId) {
        if (roleId == null) {
            return null;
        }
        return switch (roleId) {
            case 1 -> Rol.ADMIN;
            case 2 -> Rol.GERENTE;
            case 3 -> Rol.OPERADOR;
            default -> throw new IllegalArgumentException("Rol desconocido para id_role: " + roleId);
        };
    }
}
