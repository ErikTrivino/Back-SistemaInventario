package com.inventory.controladores.tablero;

import com.inventory.servicios.interfaces.tablero.TableroServicio;
import com.inventory.modelo.dto.comun.MensajeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tablero")
@RequiredArgsConstructor
public class TableroControlador {
    private final TableroServicio tableroServicio;

    /** RF-24: Dashboard crítico — KPIs del día en tiempo real. */
    @GetMapping("/resumen")
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> resumenDiario() {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getResumenDiario()));
    }

    /** RF-33: Lista de productos con stock por debajo del mínimo. */
    @GetMapping("/alertas-stock")
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> alertasStock() {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getAlertasStock()));
    }

    /** RF-24: Métricas de transferencias activas. */
    @GetMapping("/transferencias")
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> metricasTransferencias() {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getMetricasTransferencias()));
    }
}





