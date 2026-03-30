    package com.inventory.repositorios.transferencias;
    import com.inventory.modelo.entidades.transferencias.Transferencia;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;
    import java.util.List;

    @Repository
    public interface TransferenciaRepositorio extends JpaRepository<Transferencia, Long> {
        List<Transferencia> findByOriginBranchId(Long branchId);
        List<Transferencia> findByDestinationBranchId(Long branchId);
        List<Transferencia> findByStatus(String status);
        
        @org.springframework.data.jpa.repository.Query("SELECT t FROM Transferencia t " +
               "WHERE (:branchId IS NULL OR t.originBranchId = :branchId OR t.destinationBranchId = :branchId) " +
               "AND (:status IS NULL OR t.status = :status) " +
               "AND (:startDate IS NULL OR t.requestDate >= :startDate) " +
               "AND (:endDate IS NULL OR t.requestDate <= :endDate)")
        List<Transferencia> findHistoricalTransfers(
            @org.springframework.data.repository.query.Param("branchId") Long branchId,
            @org.springframework.data.repository.query.Param("status") String status,
            @org.springframework.data.repository.query.Param("startDate") java.time.LocalDateTime startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.LocalDateTime endDate
        );
    }



