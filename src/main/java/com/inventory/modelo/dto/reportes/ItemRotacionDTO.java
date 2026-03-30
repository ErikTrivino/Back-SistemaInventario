package com.inventory.modelo.dto.reportes;

import java.math.BigDecimal;

/** Ítem de clasificación ABC en el análisis de rotación. */
public record ItemRotacionDTO(
        Long idProducto,
        String nombreProducto,
        long totalSalidas,
        BigDecimal valorTotalSalidas,
        double porcentajeParticipacion,
        String clasificacion   // "A", "B", "C"
) {}
