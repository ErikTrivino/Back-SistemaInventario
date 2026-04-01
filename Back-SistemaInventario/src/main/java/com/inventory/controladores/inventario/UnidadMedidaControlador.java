package com.inventory.controladores.inventario;

import com.inventory.servicios.interfaces.inventario.UnidadMedidaServicio;
import com.inventory.modelo.dto.inventario.UnidadMedidaCrearDTO;
import com.inventory.modelo.dto.comun.MensajeDTO;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/unidades-medida")
@RequiredArgsConstructor
public class UnidadMedidaControlador {
    private final UnidadMedidaServicio unidadMedidaServicio;

    @PostMapping
    public ResponseEntity<MensajeDTO<Object>> setUnidadMedida(@Valid @RequestBody UnidadMedidaCrearDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, unidadMedidaServicio.create(dto)));
    }

    @GetMapping
    public ResponseEntity<MensajeDTO<Object>> getAll() {
        return ResponseEntity.ok(new MensajeDTO<>(false, unidadMedidaServicio.getAll()));
    }

    @GetMapping("/producto/{productId}")
    public ResponseEntity<MensajeDTO<Object>> getByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(new MensajeDTO<>(false, unidadMedidaServicio.getByProductId(productId)));
    }
}
