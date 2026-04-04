package com.inventory.controladores.logistica;

import com.inventory.modelo.dto.comun.MensajeDTO;
import com.inventory.modelo.dto.logistica.InformacionTransportistaDTO;
import com.inventory.servicios.interfaces.logistica.TransportistaServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador REST para manejar las peticiones relacionadas con los transportistas.
 */
@RestController
@RequestMapping("/api/transportistas")
@RequiredArgsConstructor
public class TransportistaControlador {

    private final TransportistaServicio transportistaServicio;

    /**
     * Endpoint para obtener todos los transportistas.
     * @return Una respuesta con la lista de transportistas.
     */
    @GetMapping
    public ResponseEntity<MensajeDTO<List<InformacionTransportistaDTO>>> listarTransportistas() {
        return ResponseEntity.ok(new MensajeDTO<>(false, transportistaServicio.listarTodos()));
    }
}
