package com.inventory.modelo.dto.transferencias;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record TransferenciaCrearDTO(
        @NotNull Long idSucursalOrigen,
        @NotNull Long idSucursalDestino,
        @NotNull Long idProducto,
        @NotNull @DecimalMin("1.00") BigDecimal cantidadSolicitada
) {}
