package com.inventory.controladores.tablero;

import com.inventory.servicios.interfaces.tablero.TableroServicio;
import com.inventory.modelo.dto.comun.MensajeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tablero")
@RequiredArgsConstructor
public class TableroControlador {
    private final TableroServicio tableroServicio;

    /** RF-24: Dashboard crítico — KPIs del día en tiempo real. */
    @GetMapping("/resumen")

    public ResponseEntity<MensajeDTO<Object>> resumenDiario() {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getResumenDiario()));
    }

    /** RF-33: Lista de productos con stock por debajo del mínimo (paginado). */
    @GetMapping("/alertas-stock")

    public ResponseEntity<MensajeDTO<Object>> alertasStock(
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getAlertasStock(pagina, porPagina)));
    }

    /** RF-33 (Ext): Lista de productos con stock superior al máximo (paginado). */
    @GetMapping("/alertas-exceso-stock")
    public ResponseEntity<MensajeDTO<Object>> alertasExcesoStock(
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getAlertasExcesoStock(pagina, porPagina)));
    }

    /** RF-24: Métricas de transferencias activas. */
    @GetMapping("/transferencias")

    public ResponseEntity<MensajeDTO<Object>> metricasTransferencias() {
        return ResponseEntity.ok(new MensajeDTO<>(false, tableroServicio.getMetricasTransferencias()));
    }
}
