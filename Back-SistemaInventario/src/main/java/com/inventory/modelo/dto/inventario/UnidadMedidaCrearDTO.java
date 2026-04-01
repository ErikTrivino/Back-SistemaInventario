package com.inventory.modelo.dto.inventario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

public record UnidadMedidaCrearDTO(
        @NotBlank String nombre,
        @NotBlank String abreviatura,
        Long idProducto,
        Boolean esUnidadBase,
        @NotNull @DecimalMin("0.0001") BigDecimal factorConversion
) {}
