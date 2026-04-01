package com.inventory.servicios.transferencias;

import com.inventory.modelo.dto.transferencias.*;
import com.inventory.modelo.entidades.transferencias.Transferencia;
import com.inventory.repositorios.transferencias.TransferenciaRepositorio;
import com.inventory.servicios.interfaces.auditoria.AuditoriaServicio;
import com.inventory.servicios.interfaces.inventario.InventarioServicio;
import com.inventory.servicios.implementaciones.transferencias.TransferenciaServicioImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TransferenciaServicioTest {

    @InjectMocks
    private TransferenciaServicioImpl transferenciaServicio;

    @Mock
    private TransferenciaRepositorio transferRepository;

    @Mock
    private InventarioServicio inventoryService;

    @Mock
    private AuditoriaServicio auditService;

    @Test
    void testSolicitarTransferencia() throws Exception {
        ItemTransferenciaDTO item = new ItemTransferenciaDTO(1L, new BigDecimal("10.00"));
        TransferenciaCrearDTO dto = new TransferenciaCrearDTO(
                1L, // idSucursalOrigen
                2L, // idSucursalDestino
                List.of(item)
        );

        when(transferRepository.save(any(Transferencia.class))).thenAnswer(invocation -> {
            Transferencia t = invocation.getArgument(0);
            if (t.getId() == null) {
                t.setId(1L);
            }
            if (t.getDetalles() == null) {
                t.setDetalles(List.of());
            }
            return t;
        });

        TransferenciaInformacionDTO resultado = transferenciaServicio.requestTransfer(dto, 1L);

        assertNotNull(resultado);
        assertNotNull(resultado.idTransferencia());
        assertEquals("SOLICITADO", resultado.estado());
    }

    @Test
    void testPrepararTransferencia() throws Exception {
        Transferencia mockT = new Transferencia();
        mockT.setId(1L);
        mockT.setDetalles(List.of());

        when(transferRepository.findById(1L)).thenReturn(Optional.of(mockT));
        when(transferRepository.save(any(Transferencia.class))).thenAnswer(i -> i.getArgument(0));

        TransferenciaPrepararDTO dto = new TransferenciaPrepararDTO(1L, new BigDecimal("10.00"));

        TransferenciaInformacionDTO resultado = transferenciaServicio.prepareTransfer(dto);
        
        assertNotNull(resultado);
        assertEquals("PREPARADO", resultado.estado());
    }

    @Test
    void testEnviarTransferencia() throws Exception {
        Transferencia mockT = new Transferencia();
        mockT.setId(1L);
        mockT.setDetalles(List.of());

        when(transferRepository.findById(1L)).thenReturn(Optional.of(mockT));
        when(transferRepository.save(any(Transferencia.class))).thenAnswer(i -> i.getArgument(0));

        TransferenciaConfirmarEnvioDTO dto = new TransferenciaConfirmarEnvioDTO(1L);

        TransferenciaInformacionDTO resultado = transferenciaServicio.shipTransfer(dto);
        
        assertNotNull(resultado);
        assertEquals("EN_TRANSITO", resultado.estado());
    }

    @Test
    void testRecibirTransferencia() throws Exception {
        Transferencia mockT = new Transferencia();
        mockT.setId(1L);
        mockT.setDetalles(List.of());

        when(transferRepository.findById(1L)).thenReturn(Optional.of(mockT));
        when(transferRepository.save(any(Transferencia.class))).thenAnswer(i -> i.getArgument(0));

        TransferenciaRecepcionDTO dto = new TransferenciaRecepcionDTO(1L, new BigDecimal("10.00"));

        TransferenciaInformacionDTO resultado = transferenciaServicio.receiveTransfer(dto);
        
        assertNotNull(resultado);
        assertEquals("RECIBIDO", resultado.estado());
    }

    @Test
    void testConsultarTransferencias() throws Exception {
        Page<Transferencia> mockPage = new PageImpl<>(List.of());
        when(transferRepository.findHistoricalTransfers(any(), any(), any(), any(), any())).thenReturn(mockPage);

        Page<TransferenciaInformacionDTO> transferencias = transferenciaServicio.getTransfers(
                1L, null, LocalDateTime.now().minusDays(30), LocalDateTime.now(), 0, 10
        );

        assertNotNull(transferencias);
    }
}
