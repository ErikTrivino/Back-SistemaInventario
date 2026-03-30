    package com.inventory.servicios.interfaces.ventas;
    import com.inventory.modelo.dto.ventas.VentaCrearDTO;
    import com.inventory.modelo.dto.ventas.VentaInformacionDTO;
    import com.inventory.modelo.dto.ventas.ValidacionStockDTO;
    import java.util.Date;
    import java.util.List;
    import java.math.BigDecimal;

    public interface VentaServicio {
        ValidacionStockDTO validateStock(Long productId, Long branchId, BigDecimal quantity);
        VentaInformacionDTO createSale(VentaCrearDTO dto, Long userId);
        List<VentaInformacionDTO> getSalesByBranch(Long branchId);
        List<VentaInformacionDTO> getSalesByDateRange(Date start, Date end);
    }



