package com.inventory.eventos;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

/**
 * Evento que representa una acción de auditoría en el sistema.
 * Este evento es capturado por el ManejadorEventos para registrar la acción en la base de datos.
 */
@Getter
public class AuditoriaEvento extends ApplicationEvent {

    private final String usuario;
    private final String accion;
    private final String entidad;
    private final Long entidadId;
    private final String detalles;

    public AuditoriaEvento(Object source, String usuario, String accion, String entidad, Long entidadId, String detalles) {
        super(source);
        this.usuario = usuario;
        this.accion = accion;
        this.entidad = entidad;
        this.entidadId = entidadId;
        this.detalles = detalles;
    }
}
