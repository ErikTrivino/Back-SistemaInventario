package com.inventory.modelo.dto.proveedores;

/** RF-41/RF-42: KPI de cumplimiento de entregas de un proveedor. */
public record CumplimientoProveedorDTO(
        Long idProveedor,
        long totalOrdenes,
        long ordenesATiempo,
        long ordenesConRetraso,
        double porcentajeCumplimiento
) {}
