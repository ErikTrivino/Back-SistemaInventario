package com.inventory.modelo.dto.tablero;

import java.math.BigDecimal;

/** RF-33: Alerta de producto con stock por debajo del mínimo. */
public record AlertaStockDTO(
        Long idProducto,
        String nombreProducto,
        Long idSucursal,
        BigDecimal stockActual,
        BigDecimal stockMinimo,
        BigDecimal diferencia
) {}
