package com.inventory.modelo.dto.transferencias;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TransferenciaConfirmarEnvioConCambiosDTO(

        @NotNull Long idTransferencia,
        BigDecimal StockAceptadoEnvio,
        Integer tiempoEstimadoEntrega,
        long idTransportista

) {
}
