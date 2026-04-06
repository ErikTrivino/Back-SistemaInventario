package com.inventory.controladores.transferencias;

import com.inventory.modelo.dto.transferencias.TransferenciaConfirmarEnvioConCambiosDTO;
import com.inventory.servicios.interfaces.transferencias.TransferenciaServicio;
import com.inventory.modelo.dto.transferencias.*;
import com.inventory.modelo.dto.comun.MensajeDTO;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import com.inventory.modelo.enums.EstadoTransferencia;

@RestController
@RequestMapping("/api/transferencias")
@RequiredArgsConstructor
public class TransferenciaControlador {
    private final TransferenciaServicio transferService;

    /** RF-18: Solicitar transferencia entre sucursales. */
    @PostMapping("/solicitar")
    public ResponseEntity<MensajeDTO<Object>> solicitar(@Valid @RequestBody TransferenciaCrearDTO dto) {
        Long userId = 1L; // Mock userId, reemplazar con extracción JWT
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.requestTransfer(dto, userId)));
    }

    /** RF-21: Preparar envío con cantidad confirmada. */
    @PutMapping("/preparar")
    public ResponseEntity<MensajeDTO<Object>> preparar(@Valid @RequestBody TransferenciaPrepararDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.prepareTransfer(dto)));
    }

    /** RF-19: Confirmar envío — descuenta stock en origen. */
    @PutMapping("/enviar")
    public ResponseEntity<MensajeDTO<Object>> enviar(@Valid @RequestBody TransferenciaConfirmarEnvioDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.shipTransfer(dto)));
    }
    @PutMapping("/enviarConCambios")
    public ResponseEntity<MensajeDTO<Object>> enviarConCambios(@Valid @RequestBody TransferenciaConfirmarEnvioConCambiosDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.shipTransferConCambios(dto)));
    }
    @PutMapping("/cancelar")
    public ResponseEntity<MensajeDTO<Object>> cancelar(@Valid @RequestBody TrasnferenciaCancelarDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.cancelarTranferencia(dto)));
    }



    /**
     * RF-20: Confirmar recepción — suma stock en destino y registra discrepancias.
     */
    @PutMapping("/recibir")
    public ResponseEntity<MensajeDTO<Object>> recibir(@Valid @RequestBody TransferenciaRecepcionDTO dto) {
        return ResponseEntity.ok(new MensajeDTO<>(false, transferService.receiveTransfer(dto)));
    }

    /** RF-23: Histórico filtrado de transferencias de la sucursal. */
    @GetMapping("/historico")
    public ResponseEntity<MensajeDTO<Object>> historico(
            @RequestParam Long branchId,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta,
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        return ResponseEntity.ok(new MensajeDTO<>(false,
                transferService.getTransfers(branchId, estado, desde, hasta, pagina, porPagina)));
    }

    @GetMapping("/entrantes")
    public ResponseEntity<MensajeDTO<Object>> entrantes(
            @RequestParam Long sucursalDestino,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta,
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        return ResponseEntity.ok(new MensajeDTO<>(false,
                transferService.getTransfersByDestino(sucursalDestino, estado, desde, hasta, pagina, porPagina)));
    }

    @GetMapping("/sucursalDestino")
    public ResponseEntity<MensajeDTO<Object>> porSucursalDestino(
            @RequestParam Long sucursalDestino,
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        List<String> estados = Arrays.asList(
                EstadoTransferencia.EN_TRANSITO.name(),
                EstadoTransferencia.RECIBIDO.name(),
                EstadoTransferencia.CANCELADO.name());
        return ResponseEntity.ok(new MensajeDTO<>(false,
                transferService.getTransfersByDestinoAndStatuses(sucursalDestino, estados, pagina, porPagina)));
    }

    @GetMapping("/sucursalOrigen")
    public ResponseEntity<MensajeDTO<Object>> porSucursalOrigen(
            @RequestParam Long sucursalOrigen,
            @RequestParam(required = false, defaultValue = "10") Integer porPagina,
            @RequestParam(required = false) Integer pagina) {
        List<String> estados = Arrays.asList(
                EstadoTransferencia.SOLICITADO.name(),
                EstadoTransferencia.APROBADO.name());
        return ResponseEntity.ok(new MensajeDTO<>(false,
                transferService.getTransfersByOrigenAndStatuses(sucursalOrigen, estados, pagina, porPagina)));
    }
}
