package com.inventory.modelo.dto.logistica;

/**
 * DTO que representa la información básica de un transportista.
 */
public record InformacionTransportistaDTO(
    Long id,
    String nombre,
    String contacto,
    String nit,
    boolean activo
) {}
