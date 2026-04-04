package com.inventory.servicios.interfaces.logistica;

import com.inventory.modelo.dto.logistica.InformacionTransportistaDTO;
import java.util.List;

/**
 * Interfaz de servicio para la gestión de transportistas.
 */
public interface TransportistaServicio {
    /**
     * Lista todos los transportistas registrados en el sistema.
     * @return Lista de DTOs con la información de los transportistas.
     */
    List<InformacionTransportistaDTO> listarTodos();
}
