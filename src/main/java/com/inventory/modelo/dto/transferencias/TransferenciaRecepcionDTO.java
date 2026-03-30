package com.inventory.modelo.dto.transferencias;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record TransferenciaRecepcionDTO(
        @NotNull Long idTransferencia,
        @NotNull @DecimalMin("0.00") BigDecimal cantidadRecibida
) {}
