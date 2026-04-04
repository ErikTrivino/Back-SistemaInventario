package com.inventory.modelo.dto.inventario;

import com.inventory.modelo.entidades.inventario.TipoMovimiento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InformacionMovimientoDTO(

        Long id,
        TipoMovimiento tipo,
        BigDecimal cantidad,
        LocalDateTime fechaMovimiento,
        Long usuarioId,
        Long sucursalId,
        Long productoId,
        Long referenciaId,
        String motivo

) {}