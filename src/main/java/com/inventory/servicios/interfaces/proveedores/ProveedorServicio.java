package com.inventory.servicios.interfaces.proveedores;

import com.inventory.modelo.dto.proveedores.*;
import java.util.List;

public interface ProveedorServicio {
    /** RF-38 */
    ProveedorInformacionDTO createSupplier(ProveedorCrearDTO dto);
    ProveedorInformacionDTO updateSupplier(Long id, ProveedorEditarDTO dto);
    ProveedorInformacionDTO toggleActivo(Long id);
    List<ProveedorInformacionDTO> getSuppliers();
    List<ProveedorInformacionDTO> getAllSuppliers();

    /** RF-39 */
    ProductoProveedorInformacionDTO registrarListaPrecio(ProductoProveedorDTO dto);
    List<ProductoProveedorInformacionDTO> getListaPreciosPorProveedor(Long supplierId);
    List<ProductoProveedorInformacionDTO> getListaPreciosPorProducto(Long productId);

    /** RF-41/RF-42 */
    CumplimientoProveedorDTO calcularCumplimiento(Long supplierId);

    /** Legacy */
    void assignProductToSupplier(Long supplierId, Long productId);
}



