package com.inventory.modelo.dto.compras;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record DetalleCompraCrearDTO(
        @NotNull Long idProducto,
        @NotNull @DecimalMin("1.00") BigDecimal cantidad,
        @NotNull @DecimalMin("0.01") BigDecimal precioUnitario,
        @DecimalMin("0.00") @DecimalMax("100.00") BigDecimal descuentoPorcentaje
) {}
