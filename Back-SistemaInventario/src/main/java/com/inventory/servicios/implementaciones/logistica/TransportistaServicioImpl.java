package com.inventory.servicios.implementaciones.logistica;

import com.inventory.modelo.dto.logistica.InformacionTransportistaDTO;
import com.inventory.modelo.entidades.logistica.Transportista;
import com.inventory.repositorios.logistica.TransportistaRepositorio;
import com.inventory.servicios.interfaces.logistica.TransportistaServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio para el manejo de transportistas.
 */
@Service
@RequiredArgsConstructor
public class TransportistaServicioImpl implements TransportistaServicio {

    private final TransportistaRepositorio transportistaRepositorio;

    /**
     * Recupera todos los transportistas y los mapea a su respectivo DTO.
     * @return Lista de InformacionTransportistaDTO.
     */
    @Override
    @Transactional(readOnly = true)
    public List<InformacionTransportistaDTO> listarTodos() {
        return transportistaRepositorio.findAll().stream()
                .map(this::mapearADTO)
                .collect(Collectors.toList());
    }

    /**
     * Mapea una entidad Transportista a su DTO correspondiente.
     * @param transportista Entidad a mapear.
     * @return El DTO poblado.
     */
    private InformacionTransportistaDTO mapearADTO(Transportista transportista) {
        return new InformacionTransportistaDTO(
                transportista.getId(),
                transportista.getNombre(),
                transportista.getContacto(),
                transportista.getNit(),
                transportista.isActivo()
        );
    }
}
