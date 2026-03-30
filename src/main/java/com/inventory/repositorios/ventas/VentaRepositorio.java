package com.inventory.repositorios.ventas;

import com.inventory.modelo.entidades.ventas.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface VentaRepositorio extends JpaRepository<Venta, Long> {
    List<Venta> findByBranchId(Long branchId);
    List<Venta> findByCreatedAtBetween(Date start, Date end);

    /** RF-24: Cuenta ventas del día actual. */
    @Query("SELECT COUNT(v) FROM Venta v WHERE DATE(v.createdAt) = CURRENT_DATE")
    long countVentasHoy();

    /** RF-24: Suma total de ingresos del día actual. */
    @Query("SELECT COALESCE(SUM(v.total), 0) FROM Venta v WHERE DATE(v.createdAt) = CURRENT_DATE")
    BigDecimal sumIngresoHoy();

    /** RF-29: Total de ventas por período. */
    @Query("SELECT COUNT(v) FROM Venta v WHERE v.createdAt BETWEEN :start AND :end")
    long countByPeriodo(@Param("start") Date start, @Param("end") Date end);

    /** RF-29: Suma de ingresos por período. */
    @Query("SELECT COALESCE(SUM(v.total), 0) FROM Venta v WHERE v.createdAt BETWEEN :start AND :end")
    BigDecimal sumIngresoPeriodo(@Param("start") Date start, @Param("end") Date end);

    /** RF-29: Ventas agrupadas por sucursal en un período. */
    @Query("SELECT v.branchId, COUNT(v), COALESCE(SUM(v.total), 0) " +
           "FROM Venta v WHERE v.createdAt BETWEEN :start AND :end GROUP BY v.branchId")
    List<Object[]> findVentasPorSucursalYPeriodo(@Param("start") Date start, @Param("end") Date end);

    /** RF-31: Ventas agrupadas por mes y año para comparativas. */
    @Query(value = "SELECT MONTH(v.fecha_venta) as mes, COUNT(*) as total, COALESCE(SUM(v.total_venta), 0) as ingreso " +
                   "FROM ventas v WHERE YEAR(v.fecha_venta) = :anio GROUP BY MONTH(v.fecha_venta) ORDER BY mes",
           nativeQuery = true)
    List<Object[]> findVentasMensualesPorAnio(@Param("anio") int anio);
}



