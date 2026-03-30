package com.inventory.modelo.dto.transferencias;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransferenciaInformacionDTO(
        Long idTransferencia,
        Long idSucursalOrigen,
        Long idSucursalDestino,
        Long idProducto,
        BigDecimal cantidadSolicitada,
        BigDecimal cantidadConfirmada,
        BigDecimal cantidadRecibida,
        String estado,
        LocalDateTime fechaSolicitud,
        LocalDateTime fechaEnvioEst,
        LocalDateTime fechaRecepcionReal
) {}
