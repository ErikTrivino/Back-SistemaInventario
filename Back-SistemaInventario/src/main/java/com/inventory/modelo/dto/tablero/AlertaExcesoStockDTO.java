package com.inventory.modelo.dto.tablero;

import java.math.BigDecimal;

/** DTO para alertas de productos con stock superior al máximo. */
public record AlertaExcesoStockDTO(
        Long idProducto,
        String nombreProducto,
        Long idSucursal,
        BigDecimal stockActual,
        BigDecimal stockMaximo,
        BigDecimal exceso
) {}
