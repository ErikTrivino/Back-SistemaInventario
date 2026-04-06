package com.inventory.eventos;

import com.inventory.modelo.entidades.inventario.Inventario;
import com.inventory.modelo.entidades.ventas.Venta;
import com.inventory.modelo.entidades.transferencias.Transferencia;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

/**
 * Componente encargado de publicar los eventos de dominio del sistema de inventario.
 * Actúa como fachada sobre {@link ApplicationEventPublisher} de Spring.
 */
@Component
@RequiredArgsConstructor
public class PublicadorEventos {

    private final ApplicationEventPublisher publisher;

    /**
     * Publica un evento de stock actualizado cuando el stock cae por debajo del mínimo.
     *
     * @param inventario         La entidad de inventario ya guardada.
     * @param usuarioResponsable ID del usuario que originó la operación de stock.
     */
    public void publicarActualizacionStock(Inventario inventario, String usuarioResponsable) {
        String nombreProducto = (inventario.getProducto() != null)
                ? inventario.getProducto().getNombre()
                : "Producto ID " + inventario.getProductoId();

        publisher.publishEvent(new StockActualizadoEvento(
                this,
                inventario.getProductoId(),
                nombreProducto,
                inventario.getSucursalId(),
                inventario.getStock(),
                inventario.getStockMinimo(),
                usuarioResponsable
        ));
    }

    /**
     * Publica un evento de venta completada.
     *
     * @param venta              La entidad de venta ya persistida.
     * @param usuarioResponsable ID del usuario (vendedor) que registró la venta.
     */
    public void publicarVentaCompletada(Venta venta, String usuarioResponsable) {
        publisher.publishEvent(new VentaCompletadaEvento(
                this,
                venta.getId(),
                venta.getSucursalId(),
                venta.getVendedorId(),
                venta.getTotal(),
                venta.getFechaVenta(),
                usuarioResponsable
        ));
    }

    /**
     * Publica un evento de transferencia creada/actualizada.
     *
     * @param transferencia      La entidad de transferencia ya persistida.
     * @param usuarioResponsable ID del usuario que solicitó o actualizó la transferencia.
     */
    public void publicarTransferenciaCreada(Transferencia transferencia, String usuarioResponsable) {
        publisher.publishEvent(new TransferenciaCreadaEvento(
                this,
                transferencia.getId(),
                transferencia.getSucursalOrigenId(),
                transferencia.getSucursalDestinoId(),
                transferencia.getEstado(),
                transferencia.getFechaSolicitud(),
                usuarioResponsable
        ));
    }

    /**
     * Publica un evento de auditoría para registrar una acción en el sistema.
     *
     * @param usuario   Nombre o ID del usuario que realiza la acción.
     * @param accion    Acción realizada (CREAR, ACTUALIZAR, ELIMINAR, etc.).
     * @param entidad   Nombre de la entidad afectada.
     * @param entidadId ID de la instancia de la entidad afectada.
     * @param detalles  Descripción de los cambios o detalles adicionales.
     */
    public void publicarAuditoria(String usuario, String accion, String entidad, Long entidadId, String detalles) {
        publisher.publishEvent(new AuditoriaEvento(this, usuario, accion, entidad, entidadId, detalles));
    }

    // ── Métodos de compatibilidad legacy (deprecated) ──────────────────────────

    /** @deprecated Usar {@link #publicarActualizacionStock(Inventario, String)} */
    @Deprecated(forRemoval = true)
    public void publishStockUpdate(Object source) {
        publisher.publishEvent(new StockActualizadoEvento(source, null, null, null, null, null, null));
    }

    /** @deprecated Usar {@link #publicarVentaCompletada(Venta, String)} */
    @Deprecated(forRemoval = true)
    public void publishSale(Object source) {
        publisher.publishEvent(new VentaCompletadaEvento(source, null, null, null, null, null, null));
    }

    /** @deprecated Usar {@link #publicarTransferenciaCreada(Transferencia, String)} */
    @Deprecated(forRemoval = true)
    public void publishTransfer(Object source) {
        publisher.publishEvent(new TransferenciaCreadaEvento(source, null, null, null, null, null, null));
    }
}
