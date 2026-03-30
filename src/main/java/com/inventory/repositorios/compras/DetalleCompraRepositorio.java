    package com.inventory.repositorios.compras;
    import com.inventory.modelo.entidades.compras.DetalleCompra;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;
    import java.util.List;

    @Repository
    public interface DetalleCompraRepositorio extends JpaRepository<DetalleCompra, Long> {
        List<DetalleCompra> findByOrdenCompraId(Long ordenCompraId);
        
        @org.springframework.data.jpa.repository.Query("SELECT new com.inventory.modelo.dto.compras.CompraHistoricoRespuestaDTO(" +
               "o.id, p.id, p.name, prov.id, prov.name, d.cantidadSolicitada, d.cantidadRecibida, d.precioUnitario, o.purchaseDate" +
               ") FROM DetalleCompra d " +
               "JOIN OrdenCompra o ON d.ordenCompraId = o.id " +
               "JOIN Producto p ON d.productId = p.id " +
               "JOIN Proveedor prov ON o.supplierId = prov.id " +
               "WHERE (:supplierId IS NULL OR prov.id = :supplierId) " +
               "AND (:productId IS NULL OR p.id = :productId) " +
               "AND (:startDate IS NULL OR o.purchaseDate >= :startDate) " +
               "AND (:endDate IS NULL OR o.purchaseDate <= :endDate)")
        List<com.inventory.modelo.dto.compras.CompraHistoricoRespuestaDTO> findHistoricalPurchases(
            @org.springframework.data.repository.query.Param("supplierId") Long supplierId,
            @org.springframework.data.repository.query.Param("productId") Long productId,
            @org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.LocalDateTime endDate
        );
    }



