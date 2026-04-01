package com.inventory.modelo.dto.proveedores;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/** RF-39: DTO para registrar o actualizar la lista de precios de un proveedor-producto. */
public record ProductoProveedorDTO(
        @NotNull Long idProveedor,
        @NotNull Long idProducto,
        @NotNull @DecimalMin("0.01") BigDecimal precioCompra,
        @DecimalMin("0.00") @DecimalMax("100.00") BigDecimal descuentoProveedor,
        @NotNull @Min(0) Integer leadTimeDias,
        LocalDate fechaVigenciaDesde
) {}
