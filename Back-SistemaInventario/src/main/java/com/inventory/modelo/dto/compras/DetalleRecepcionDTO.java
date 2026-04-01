package com.inventory.modelo.dto.compras;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record DetalleRecepcionDTO(
        @NotNull Long idDetalle,
        @NotNull @DecimalMin("0.00") BigDecimal cantidadRecibida
) {}
