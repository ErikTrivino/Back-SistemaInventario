    package com.inventory.servicios.interfaces.transferencias;
    import com.inventory.modelo.dto.transferencias.*;
    import java.time.LocalDateTime;
    import java.util.List;

    public interface TransferenciaServicio {
        TransferenciaInformacionDTO requestTransfer(TransferenciaCrearDTO dto, Long userId);
        TransferenciaInformacionDTO prepareTransfer(TransferenciaPrepararDTO dto);
        TransferenciaInformacionDTO shipTransfer(TransferenciaConfirmarEnvioDTO dto);
        TransferenciaInformacionDTO receiveTransfer(TransferenciaRecepcionDTO dto);
        List<TransferenciaInformacionDTO> getTransfers(Long branchId, String status, LocalDateTime startDate, LocalDateTime endDate);
    }



