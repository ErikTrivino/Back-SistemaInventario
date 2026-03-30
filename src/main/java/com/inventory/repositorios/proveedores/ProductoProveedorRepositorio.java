package com.inventory.repositorios.proveedores;

import com.inventory.modelo.dto.proveedores.CumplimientoProveedorDTO;
import com.inventory.modelo.entidades.proveedores.ProductoProveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoProveedorRepositorio extends JpaRepository<ProductoProveedor, Long> {
    List<ProductoProveedor> findBySupplierId(Long supplierId);
    List<ProductoProveedor> findByProductId(Long productId);

    /**
     * RF-41/RF-42: KPI de cumplimiento de proveedor.
     * Compara si las recepciones de los pedidos se hicieron dentro del lead time pactado.
     * Unifica con la tabla de órdenes de compra (oc) y detalles de recepción (dr).
     */
    @Query(value = """
        SELECT new com.inventory.modelo.dto.proveedores.CumplimientoProveedorDTO(
            :supplierId,
            COUNT(oc.id),
            SUM(CASE WHEN DATEDIFF(dr.fechaRecepcion, oc.fechaCreacion) <= pp.leadTimeDias THEN 1 ELSE 0 END),
            SUM(CASE WHEN DATEDIFF(dr.fechaRecepcion, oc.fechaCreacion) > pp.leadTimeDias THEN 1 ELSE 0 END),
            CASE WHEN COUNT(oc.id) > 0
                 THEN (SUM(CASE WHEN DATEDIFF(dr.fechaRecepcion, oc.fechaCreacion) <= pp.leadTimeDias THEN 1.0 ELSE 0.0 END) / COUNT(oc.id)) * 100
                 ELSE 0.0
            END
        )
        FROM OrdenCompra oc
        JOIN DetalleCompra dc ON dc.ordenId = oc.id
        JOIN ProductoProveedor pp ON pp.supplierId = oc.supplierId AND pp.productId = dc.productId
        LEFT JOIN DetalleRecepcion dr ON dr.ordenId = oc.id
        WHERE oc.supplierId = :supplierId AND dr.fechaRecepcion IS NOT NULL
    """, nativeQuery = false)
    CumplimientoProveedorDTO calcularCumplimientoProveedor(@Param("supplierId") Long supplierId);
}



