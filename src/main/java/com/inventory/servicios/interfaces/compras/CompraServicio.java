    package com.inventory.servicios.interfaces.compras;
    import com.inventory.modelo.dto.compras.OrdenCompraCrearDTO;
    import com.inventory.modelo.dto.compras.OrdenCompraRecepcionDTO;
    import com.inventory.modelo.dto.compras.CompraHistoricoRespuestaDTO;
    import com.inventory.modelo.dto.compras.CompraInformacionDTO;
    import java.time.LocalDateTime;
    import java.util.List;

    public interface CompraServicio {
        CompraInformacionDTO createPurchase(OrdenCompraCrearDTO dto, Long userId);
        void receivePurchase(OrdenCompraRecepcionDTO dto);
        List<CompraHistoricoRespuestaDTO> getPurchaseHistory(Long supplierId, Long productId, LocalDateTime start, LocalDateTime end);
    }



