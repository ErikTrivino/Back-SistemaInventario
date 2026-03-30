    package com.inventory.repositorios.inventario;
    import com.inventory.modelo.entidades.inventario.Inventario;
    import com.inventory.modelo.entidades.inventario.InventarioId;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;
    import java.util.List;
    import java.util.Optional;

    @Repository
    public interface InventarioRepositorio extends JpaRepository<Inventario, InventarioId> {
        Optional<Inventario> findByProductIdAndBranchId(Long productId, Long branchId);
        List<Inventario> findByBranchId(Long branchId);
        // Placeholder: need to define how min stock is queried, e.g., using @Query if it compares two columns
        // Using a native/JPQL query as placeholder:
        @org.springframework.data.jpa.repository.Query("SELECT i FROM Inventario i WHERE i.stock < i.minStock")
        List<Inventario> findByQuantityLessThanMinStock();

        @org.springframework.data.jpa.repository.Query("SELECT new com.inventory.modelo.dto.inventario.InventarioRespuestaDTO(" +
               "p.id, p.name, p.sku, p.unitType, p.active, i.branchId, i.stock, i.minStock) " +
               "FROM Inventario i JOIN Producto p ON i.productId = p.id " +
               "WHERE i.branchId = :branchId AND p.active = true")
        List<com.inventory.modelo.dto.inventario.InventarioRespuestaDTO> findActiveCatalogByBranch(@org.springframework.data.repository.query.Param("branchId") Long branchId);
    }



