package com.inventory.controladores.proveedores;

import com.inventory.servicios.interfaces.proveedores.ProveedorServicio;
import com.inventory.modelo.dto.proveedores.*;
import com.inventory.modelo.dto.comun.MensajeDTO;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proveedores")
@RequiredArgsConstructor
public class ProveedorControlador {
    private final ProveedorServicio proveedorServicio;

    /** RF-38: Listar proveedores activos. */
    @GetMapping
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> listar() {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.getSuppliers()));
    }

    /** RF-38: Listar todos (incluyendo inactivos). Solo ADMIN. */
    @GetMapping("/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> listarTodos() {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.getAllSuppliers()));
    }

    /** RF-38: Crear proveedor con NIT único y estado activo. */
    @PostMapping
    @PreAuthorize("hasAnyRole('GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> crear(@Valid @RequestBody ProveedorCrearDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.createSupplier(dto)));
    }

    /** RF-38: Actualizar datos del proveedor. */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> actualizar(@PathVariable Long id, @Valid @RequestBody ProveedorEditarDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.updateSupplier(id, dto)));
    }

    /** RF-38: Activar/Desactivar proveedor lógicamente. */
    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAnyRole('GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> toggleEstado(@PathVariable Long id) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.toggleActivo(id)));
    }

    /** RF-39: Registrar condiciones de precio y lead-time. */
    @PostMapping("/lista-precios")
    @PreAuthorize("hasAnyRole('GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> registrarPrecio(@Valid @RequestBody ProductoProveedorDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.registrarListaPrecio(dto)));
    }

    /** RF-39/RF-43: Historial de precios de un proveedor (fluctuación). */
    @GetMapping("/{id}/lista-precios")
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> preciosPorProveedor(@PathVariable Long id) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.getListaPreciosPorProveedor(id)));
    }

    /** RF-39: Precios disponibles de un producto por todos sus proveedores. */
    @GetMapping("/producto/{idProducto}/precios")
    @PreAuthorize("hasAnyRole('OPERADOR', 'GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> preciosPorProducto(@PathVariable Long idProducto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.getListaPreciosPorProducto(idProducto)));
    }

    /** RF-41/RF-42: KPI de cumplimiento de entregas del proveedor. */
    @GetMapping("/{id}/cumplimiento")
    @PreAuthorize("hasAnyRole('GERENTE', 'ADMIN')")
    public ResponseEntity<MensajeDTO<Object>> cumplimiento(@PathVariable Long id) {
        return ResponseEntity.ok(new MensajeDTO<>(false, proveedorServicio.calcularCumplimiento(id)));
    }
}





