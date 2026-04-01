package com.inventory.modelo.dto.transferencias;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record TransferenciaPrepararDTO(
        @NotNull Long idTransferencia,
        @NotNull @DecimalMin("1.00") BigDecimal cantidadConfirmada
) {}
