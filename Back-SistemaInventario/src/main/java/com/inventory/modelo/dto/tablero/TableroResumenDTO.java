package com.inventory.modelo.dto.tablero;

import java.math.BigDecimal;
import java.util.List;

/**
 * RF-24: Dashboard crítico con métricas principales del sistema.
 * Muestra ventas del día, entradas, transferencias pendientes y alertas de stock mínimo.
 */
public record TableroResumenDTO(
        // Ventas del día
        long ventasHoy,
        BigDecimal ingresoHoy,

        // Inventario
        long productosEnStockMinimo,
        long productosAgotados,

        // Transferencias
        long transferenciasPendientes,
        long transferenciasEnTransito,

        // Compras
        long ordenesPendientesRecepcion,

        // Alertas críticas
        List<AlertaStockDTO> alertasStock
) {}
