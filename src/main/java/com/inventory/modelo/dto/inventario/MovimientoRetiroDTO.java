package com.inventory.modelo.dto.inventario;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record MovimientoRetiroDTO(
        @NotNull Long idProducto,
        @NotNull Long idSucursal,
        @NotNull @DecimalMin("0.01") BigDecimal cantidadRetirar,
        @NotBlank String tipoRetiro,
        Long idUsuarioResponsable,
        String motivo
) {}
