package com.inventory.modelo.dto.reportes;

import java.math.BigDecimal;

/** RF-29: Desglose de ventas por sucursal dentro de un reporte. */
public record ResumenVentaSucursalDTO(
        Long idSucursal,
        long cantidadVentas,
        BigDecimal ingresoTotal
) {}
