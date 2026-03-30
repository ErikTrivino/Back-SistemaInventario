package com.inventory.modelo.dto.reportes;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Ítem de detalle en el reporte de transferencias. */
public record ItemTransferenciaDTO(
        Long idTransferencia,
        Long idSucursalOrigen,
        Long idSucursalDestino,
        Long idProducto,
        BigDecimal cantidadSolicitada,
        BigDecimal cantidadRecibida,
        String estado,
        LocalDateTime fechaSolicitud,
        LocalDateTime fechaRecepcion
) {}
