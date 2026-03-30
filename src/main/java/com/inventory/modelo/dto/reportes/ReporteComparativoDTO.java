package com.inventory.modelo.dto.reportes;

import java.util.List;

/** RF-31: Reporte comparativo de ventas por mes/año. */
public record ReporteComparativoDTO(
        int anio,
        List<ResumenMensualDTO> meses
) {}
