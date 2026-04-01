package com.inventory.modelo.dto.reportes;

import java.math.BigDecimal;

/** Ítem de detalle en el reporte de inventario. */
public record ItemInventarioDTO(
        Long idProducto,
        String nombreProducto,
        String sku,
        BigDecimal stockActual,
        BigDecimal stockMinimo,
        String estadoStock  // "NORMAL", "BAJO", "AGOTADO"
) {}
