package com.inventory.servicios.interfaces.inventario;

import com.inventory.modelo.dto.inventario.InformacionMovimientoDTO;
import com.inventory.modelo.dto.inventario.MovimientoRetiroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface MovimientoServicio {
    void registrarRetiro(MovimientoRetiroDTO dto);
    
    Page<InformacionMovimientoDTO> buscarMovimientos(
            Long productoId,
            Long sucursalId,
            LocalDateTime fechaInicio,
            LocalDateTime fechaFin,
            Pageable pageable
    );
}
