package com.inventory.modelo.dto.compras;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record OrdenCompraCrearDTO(
        @NotNull Long idSucursalDestino,
        @NotNull Long idProveedor,
        Integer plazoPagoDias,
        @NotEmpty List<DetalleCompraCrearDTO> detalles
) {}
