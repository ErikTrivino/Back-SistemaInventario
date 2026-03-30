package com.inventory.servicios.interfaces.inventario;
import com.inventory.modelo.dto.inventario.UnidadMedidaCrearDTO;
import com.inventory.modelo.entidades.inventario.UnidadMedida;
import java.util.List;

public interface UnidadMedidaServicio {
    UnidadMedida create(UnidadMedidaCrearDTO dto);
    List<UnidadMedida> getByProductId(Long productId);
    List<UnidadMedida> getAll();
}
