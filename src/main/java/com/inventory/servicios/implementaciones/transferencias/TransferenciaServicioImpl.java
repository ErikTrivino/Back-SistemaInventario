package com.inventory.servicios.implementaciones.transferencias;

import com.inventory.servicios.interfaces.transferencias.TransferenciaServicio;
import com.inventory.servicios.interfaces.inventario.InventarioServicio;
import com.inventory.repositorios.transferencias.TransferenciaRepositorio;
import com.inventory.servicios.interfaces.auditoria.AuditoriaServicio;
import com.inventory.modelo.dto.transferencias.*;
import com.inventory.modelo.entidades.transferencias.Transferencia;
import com.inventory.modelo.entidades.transferencias.EstadoTransferencia;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferenciaServicioImpl implements TransferenciaServicio {
    private final TransferenciaRepositorio transferRepository;
    private final InventarioServicio inventoryService;
    private final AuditoriaServicio auditService;

    @Override
    @Transactional
    public TransferenciaInformacionDTO requestTransfer(TransferenciaCrearDTO dto, Long userId) {
        Transferencia transfer = Transferencia.builder()
                .originBranchId(dto.idSucursalOrigen())
                .destinationBranchId(dto.idSucursalDestino())
                .productId(dto.idProducto())
                .quantity(dto.cantidadSolicitada())
                .requestUserId(userId)
                .requestDate(LocalDateTime.now())
                .status(EstadoTransferencia.SOLICITADO.name())
                .build();
        Transferencia saved = transferRepository.save(transfer);
        auditService.logAction(userId, "REQUEST_TRANSFER", "Transferencia", saved.getId(), "Transferencia Solicitada");
        return toInfo(saved);
    }

    @Override
    @Transactional
    public TransferenciaInformacionDTO prepareTransfer(TransferenciaPrepararDTO dto) {
        Transferencia transfer = transferRepository.findById(dto.idTransferencia()).orElseThrow();
        // Validar sucursal origen - el controlador puede inyectar esto o se asume validez de momento
        transfer.setConfirmedQuantity(dto.cantidadConfirmada());
        transfer.setStatus("PREPARADO"); // RF-21: Preparar envío
        
        auditService.logAction(1L, "PREPARE_TRANSFER", "Transferencia", transfer.getId(), "Preparado para envíar: " + dto.cantidadConfirmada());
        return toInfo(transferRepository.save(transfer));
    }

    @Override
    @Transactional
    public TransferenciaInformacionDTO shipTransfer(TransferenciaConfirmarEnvioDTO dto) {
        Transferencia transfer = transferRepository.findById(dto.idTransferencia()).orElseThrow();
        if (transfer.getConfirmedQuantity() == null) {
            throw new RuntimeException("Debe prepararse la transferencia confirmando cantidad antes de enviar.");
        }
        
        // RF-19: Sólo en origen, descuenta inventario origen atómicamente
        inventoryService.updateStock(
            transfer.getProductId(), 
            transfer.getOriginBranchId(), 
            transfer.getConfirmedQuantity().doubleValue(), 
            "OUT", 
            "Envío Transferencia #" + transfer.getId()
        );

        transfer.setStatus(EstadoTransferencia.EN_TRANSITO.name());
        auditService.logAction(1L, "SHIP_TRANSFER", "Transferencia", transfer.getId(), "Enviado");
        return toInfo(transferRepository.save(transfer));
    }

    @Override
    @Transactional
    public TransferenciaInformacionDTO receiveTransfer(TransferenciaRecepcionDTO dto) {
        Transferencia transfer = transferRepository.findById(dto.idTransferencia()).orElseThrow();
        
        // RF-20: Sumar inventario en recepción destino
        inventoryService.updateStock(
            transfer.getProductId(), 
            transfer.getDestinationBranchId(), 
            dto.cantidadRecibida().doubleValue(), 
            "IN", 
            "Recepcioón Transferencia #" + transfer.getId()
        );

        transfer.setReceivedQuantity(dto.cantidadRecibida());
        transfer.setReceivedDate(LocalDateTime.now());
        
        // Registrar diferencias
        if (transfer.getConfirmedQuantity().compareTo(dto.cantidadRecibida()) != 0) {
            transfer.setStatus(EstadoTransferencia.FALTANTES.name());
        } else {
            transfer.setStatus(EstadoTransferencia.RECIBIDO.name());
        }
        
        auditService.logAction(1L, "RECEIVE_TRANSFER", "Transferencia", transfer.getId(), "Recibido " + dto.cantidadRecibida());
        return toInfo(transferRepository.save(transfer));
    }

    @Override
    public List<TransferenciaInformacionDTO> getTransfers(Long branchId, String status, LocalDateTime startDate, LocalDateTime endDate) {
        return transferRepository.findHistoricalTransfers(branchId, status, startDate, endDate).stream().map(this::toInfo).toList();
    }

    private TransferenciaInformacionDTO toInfo(Transferencia t) {
        return new TransferenciaInformacionDTO(
                t.getId(),
                t.getOriginBranchId(),
                t.getDestinationBranchId(),
                t.getProductId(),
                t.getQuantity(),
                t.getConfirmedQuantity(),
                t.getReceivedQuantity(),
                t.getStatus(),
                t.getRequestDate(),
                t.getEstimatedDate(),
                t.getReceivedDate()
        );
    }
}



