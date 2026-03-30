package com.inventory.modelo.dto.compras;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record OrdenCompraRecepcionDTO(
        @NotNull Long idOrdenCompra,
        @NotNull Long idSucursalDestino,
        @NotEmpty List<DetalleRecepcionDTO> detallesRecibidos
) {}
