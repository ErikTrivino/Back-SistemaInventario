package com.inventory.servicios.ventas;

import com.inventory.modelo.dto.ventas.*;
import com.inventory.modelo.entidades.ventas.Venta;
import com.inventory.modelo.entidades.ventas.DetalleVenta;
import com.inventory.modelo.entidades.inventario.Inventario;
import com.inventory.repositorios.ventas.VentaRepositorio;
import com.inventory.repositorios.ventas.DetalleVentaRepositorio;
import com.inventory.repositorios.inventario.InventarioRepositorio;
import com.inventory.servicios.interfaces.auditoria.AuditoriaServicio;
import com.inventory.servicios.interfaces.inventario.InventarioServicio;
import com.inventory.servicios.implementaciones.ventas.VentaServicioImpl;
import com.inventory.eventos.PublicadorEventos;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class VentaServicioTest {

    @InjectMocks
    private VentaServicioImpl ventaServicio;

    @Mock
    private VentaRepositorio saleRepository;

    @Mock
    private DetalleVentaRepositorio detailRepository;

    @Mock
    private InventarioServicio inventoryService;

    @Mock
    private InventarioRepositorio inventoryRepository;

    @Mock
    private AuditoriaServicio auditService;

    @Mock
    private PublicadorEventos eventPublisher;

    @Test
    void testCrearVenta() throws Exception {
        DetalleVentaCrearDTO detalle = new DetalleVentaCrearDTO(
                1L, // idProducto
                new BigDecimal("2.00"), // cantidad
                new BigDecimal("5000.00"), // precioUnitario
                new BigDecimal("0.00"), // descuento
                "Precio General" // lista de precio
        );

        VentaCrearDTO dto = new VentaCrearDTO(1L,1L, List.of(detalle));

        // Simular búsqueda de inventario con stock
        Inventario mockInv = new Inventario();
        mockInv.setStock(new BigDecimal("100.00"));
        when(inventoryRepository.findByProducto_IdAndSucursal_Id(any(), any()))
                .thenReturn(Optional.of(mockInv));

        // Simular guardado de venta
        when(saleRepository.save(any(Venta.class))).thenAnswer(invocation -> {
            Venta v = invocation.getArgument(0);
            if (v.getId() == null) {
                v.setId(1L);
            }
            return v;
        });

        VentaInformacionDTO resultado = ventaServicio.createSale(dto);

        assertNotNull(resultado);
        assertNotNull(resultado.idVenta());
        assertEquals(0, new BigDecimal("10000.00").compareTo(resultado.total()));
    }

    @Test
    void testValidarStock() throws Exception {
        Inventario mockInv = new Inventario();
        mockInv.setStock(new BigDecimal("10.00"));
        when(inventoryRepository.findByProducto_IdAndSucursal_Id(any(), any()))
                .thenReturn(Optional.of(mockInv));

        ValidacionStockDTO validacion = ventaServicio.validateStock(1L, 1L, new BigDecimal("1.00"));

        assertNotNull(validacion);
        assertTrue(validacion.disponible());
    }

    @Test
    void testConsultarVentasPorSucursal() throws Exception {
        Page<Venta> mockPage = new PageImpl<>(List.of());
        when(saleRepository.findBySucursalId(any(), any())).thenReturn(mockPage);

        Page<VentaInformacionDTO> ventas = ventaServicio.getSalesByBranch(1L, 0, 10);
        assertNotNull(ventas);
    }
}
