package com.inventory.modelo.dto.transferencias;

import jakarta.validation.constraints.NotNull;

public record TrasnferenciaCancelarDTO(

        @NotNull Long idTransferencia
) {
}
