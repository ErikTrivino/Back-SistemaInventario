    package com.inventory.servicios.interfaces.transferencias;
    import com.inventory.modelo.dto.transferencias.*;
    import java.time.LocalDateTime;
    import java.util.List;
    import org.springframework.data.domain.Page;

    public interface TransferenciaServicio {
        TransferenciaInformacionDTO requestTransfer(TransferenciaCrearDTO dto, Long userId);
        TransferenciaInformacionDTO prepareTransfer(TransferenciaPrepararDTO dto);
        TransferenciaInformacionDTO shipTransfer(TransferenciaConfirmarEnvioDTO dto);
        TransferenciaInformacionDTO cancelarTranferencia(TrasnferenciaCancelarDTO dto);
        TransferenciaInformacionDTO shipTransferConCambios(TransferenciaConfirmarEnvioConCambiosDTO dto);
        TransferenciaInformacionDTO receiveTransfer(TransferenciaRecepcionDTO dto);
        Page<TransferenciaInformacionDTO> getTransfers(Long branchId, String status, LocalDateTime startDate, LocalDateTime endDate, Integer pagina, Integer porPagina);
        Page<TransferenciaInformacionDTO> getTransfersByDestino(Long sucursalDestinoId, String status, LocalDateTime startDate, LocalDateTime endDate, Integer pagina, Integer porPagina);
        Page<TransferenciaInformacionDTO> getTransfersByDestinoAndStatuses(Long sucursalDestinoId, List<String> statuses, Integer pagina, Integer porPagina);
        Page<TransferenciaInformacionDTO> getTransfersByOrigenAndStatuses(Long sucursalOrigenId, List<String> statuses, Integer pagina, Integer porPagina);
    }


