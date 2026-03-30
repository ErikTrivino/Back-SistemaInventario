package com.inventory.modelo.dto.ventas;

import java.math.BigDecimal;

public record ValidacionStockDTO(
        Long idProducto,
        BigDecimal cantidadSolicitada,
        BigDecimal cantidadDisponible,
        boolean disponible
) {}
