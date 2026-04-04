package com.inventory.servicios.implementaciones.inventario;

import com.inventory.modelo.dto.inventario.InformacionMovimientoDTO;
import com.inventory.servicios.interfaces.inventario.MovimientoServicio;
import com.inventory.servicios.interfaces.inventario.InventarioServicio;
import com.inventory.modelo.dto.inventario.MovimientoRetiroDTO;
import com.inventory.repositorios.inventario.MovimientoInventarioRepositorio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MovimientoServicioImpl implements MovimientoServicio {
    private final InventarioServicio inventarioServicio;
    private final MovimientoInventarioRepositorio movimientoInventarioRepositorio;

    @Override
    @Transactional(readOnly = true)
    public Page<InformacionMovimientoDTO> buscarMovimientos(
            Long productoId,
            Long sucursalId,
            LocalDateTime fechaInicio,
            LocalDateTime fechaFin,
            Pageable pageable
    ) {
        return movimientoInventarioRepositorio.buscarMovimientos(
            productoId,
            sucursalId,
            fechaInicio,
            fechaFin,
            pageable
        );
    }

    @Override
    @Transactional
    public void registrarRetiro(MovimientoRetiroDTO dto) {
        String tipoInterno = switch(dto.tipoRetiro().toUpperCase()) {
            case "VENTA" -> "OUT"; // Maps to SALIDA_VENTA inside updateStock manually or just pass specific reason
            case "MERMA" -> "OUT";
            case "AJUSTE" -> "OUT";
            default -> throw new RuntimeException("Tipo de retiro no válido");
        };
        
        String reason = dto.motivo() != null && !dto.motivo().isBlank() 
            ? "Retiro por " + dto.tipoRetiro() + ": " + dto.motivo() 
            : "Retiro por " + dto.tipoRetiro();
            
        inventarioServicio.updateStock(
            dto.idProducto(),
            dto.idSucursal(),
            dto.cantidadRetirar().doubleValue(),
            tipoInterno,
            reason,
            "sistema"
        );
    }
}
