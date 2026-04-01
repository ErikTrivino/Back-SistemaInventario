package com.inventory.modelo.dto.reportes;

import java.math.BigDecimal;

/** Resumen mensual de ventas para reporte comparativo. */
public record ResumenMensualDTO(
        int mes,
        String nombreMes,
        long cantidadVentas,
        BigDecimal ingresoTotal,
        BigDecimal variacionPorcentual  // vs. mes anterior
) {}
