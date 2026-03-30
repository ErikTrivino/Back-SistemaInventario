package com.inventory.modelo.dto.proveedores;

import java.math.BigDecimal;
import java.time.LocalDate;

/** Respuesta de la lista de precios por proveedor-producto (RF-39, RF-43). */
public record ProductoProveedorInformacionDTO(
        Long id,
        Long idProveedor,
        Long idProducto,
        BigDecimal precioCompra,
        BigDecimal descuentoProveedor,
        Integer leadTimeDias,
        LocalDate fechaVigenciaDesde
) {}
