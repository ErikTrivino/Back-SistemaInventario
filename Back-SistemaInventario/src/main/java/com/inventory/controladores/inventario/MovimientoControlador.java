package com.inventory.controladores.inventario;

import com.inventory.modelo.dto.inventario.InformacionMovimientoDTO;
import com.inventory.servicios.interfaces.inventario.MovimientoServicio;
import com.inventory.modelo.dto.inventario.MovimientoRetiroDTO;
import com.inventory.modelo.dto.comun.MensajeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
public class MovimientoControlador {
    private final MovimientoServicio movimientoServicio;

    @PostMapping("/retiro")
    public ResponseEntity<MensajeDTO<Object>> registrarRetiro(@Valid @RequestBody MovimientoRetiroDTO dto) {
        movimientoServicio.registrarRetiro(dto);
        return ResponseEntity.ok(new MensajeDTO<>(false, "Retiro registrado exitosamente"));
    }

    @GetMapping
    public ResponseEntity<MensajeDTO<Page<InformacionMovimientoDTO>>> buscarMovimientos(
            @RequestParam(required = false) Long productoId,
            @RequestParam(required = false) Long sucursalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFin,
            Pageable pageable
    ) {
        return ResponseEntity.ok(new MensajeDTO<>(false, movimientoServicio.buscarMovimientos(
                productoId, sucursalId, fechaInicio, fechaFin, pageable
        )));
    }
}
