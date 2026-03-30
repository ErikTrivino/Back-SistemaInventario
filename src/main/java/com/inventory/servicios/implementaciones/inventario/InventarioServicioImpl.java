    package com.inventory.servicios.implementaciones.inventario;
    import com.inventory.servicios.interfaces.inventario.InventarioServicio;
    import com.inventory.servicios.interfaces.auditoria.AuditoriaServicio;
    import com.inventory.eventos.PublicadorEventos;
    import com.inventory.repositorios.inventario.ProductoRepositorio;
    import com.inventory.repositorios.inventario.InventarioRepositorio;
    import com.inventory.repositorios.inventario.MovimientoInventarioRepositorio;
    import com.inventory.modelo.dto.inventario.InventarioInformacionDTO;
    import com.inventory.modelo.dto.inventario.ProductoCrearDTO;
    import com.inventory.modelo.dto.inventario.ProductoDetalleDTO;
    import com.inventory.modelo.dto.inventario.ProductoEditarDTO;
    import com.inventory.modelo.dto.inventario.ProductoInformacionDTO;
    import com.inventory.modelo.dto.inventario.InventarioRespuestaDTO;
    import com.inventory.modelo.entidades.inventario.Producto;
    import com.inventory.modelo.entidades.inventario.Inventario;
    import com.inventory.modelo.entidades.inventario.MovimientoInventario;
    import com.inventory.modelo.entidades.inventario.TipoMovimiento;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import lombok.RequiredArgsConstructor;
    import java.util.List;
    import java.time.LocalDateTime;
    import org.springframework.transaction.annotation.Transactional;
    import lombok.RequiredArgsConstructor;
    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class InventarioServicioImpl implements InventarioServicio {
        private final ProductoRepositorio productRepository;
        private final InventarioRepositorio inventoryRepository;
        private final MovimientoInventarioRepositorio movementRepository;
        private final AuditoriaServicio auditService;
        private final PublicadorEventos eventPublisher;

        @Override
        @Transactional
        public ProductoDetalleDTO createProduct(ProductoCrearDTO dto) {
            Producto product = Producto.builder()
                    .name(dto.nombre())
                    .description(dto.descripcion())
                    .sku(dto.sku())
                    .unitType(dto.unidadMedidaBase())
                    .averageCost(dto.precioCostoPromedio() == null ? java.math.BigDecimal.ZERO : dto.precioCostoPromedio())
                    .build();
            Producto saved = productRepository.save(product);
            
            if (dto.cantidadInicial() != null && dto.cantidadInicial().compareTo(java.math.BigDecimal.ZERO) > 0 && dto.idSucursal() != null) {
                Inventario inventario = Inventario.builder()
                        .productId(saved.getId())
                        .branchId(dto.idSucursal())
                        .stock(dto.cantidadInicial())
                        .minStock(java.math.BigDecimal.ZERO)
                        .build();
                inventoryRepository.save(inventario);

                MovimientoInventario movement = MovimientoInventario.builder()
                        .type(TipoMovimiento.ENTRADA_COMPRA)
                        .quantity(dto.cantidadInicial())
                        .createdAt(LocalDateTime.now())
                        .branchId(dto.idSucursal())
                        .productId(saved.getId())
                        .reason("Inventario inicial")
                        .build();
                movementRepository.save(movement);
            }

            auditService.logAction(1L, "CREATE", "Producto", saved.getId(), "Created product");
            return toDetalleDTO(saved);
        }

        @Override
        public ProductoDetalleDTO updateProduct(Long id, ProductoEditarDTO dto) {
            Producto product = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            product.setName(dto.nombre());
            product.setDescription(dto.descripcion());
            product.setSku(dto.sku());
            product.setUnitType(dto.unidadMedidaBase());
            product.setAverageCost(dto.precioCostoPromedio() == null ? java.math.BigDecimal.ZERO : dto.precioCostoPromedio());

            Producto saved = productRepository.save(product);
            return toDetalleDTO(saved);
        }

        @Override
        public void deleteProduct(Long id) { }

        @Override
        public List<ProductoInformacionDTO> getProducts() {
            return productRepository.findAll().stream().map(this::toInformacionDTO).toList();
        }

        @Override
        public List<InventarioInformacionDTO> getInventoryByBranch(Long branchId) {
            return inventoryRepository.findByBranchId(branchId).stream().map(this::toInventarioInformacion).toList();
        }

        @Override
        @Transactional
        public void updateStock(Long productId, Long branchId, Double quantity, String type, String reason) {
            Inventario inv = inventoryRepository.findByProductIdAndBranchId(productId, branchId)
                    .orElseThrow(() -> new RuntimeException("Inventario not found"));

            java.math.BigDecimal amount = java.math.BigDecimal.valueOf(quantity);

            if (type.equals("OUT")) {
                if (inv.getStock().compareTo(amount) < 0) {
                    throw new RuntimeException("Stock insuficiente para realizar esta operación.");
                }
                inv.setStock(inv.getStock().subtract(amount));
            } else if (type.equals("IN")) {
                inv.setStock(inv.getStock().add(amount));
            } else {
                throw new RuntimeException("Tipo de operación no válido");
            }
            inventoryRepository.save(inv);

            MovimientoInventario movement = MovimientoInventario.builder()
                    .type(type.equals("IN") ? TipoMovimiento.ENTRADA_COMPRA : TipoMovimiento.SALIDA_VENTA)
                    .quantity(amount)
                    .createdAt(LocalDateTime.now())
                    .branchId(branchId)
                    .productId(productId)
                    .reason(reason != null ? reason : "Actualización de stock")
                    .build();
            movementRepository.save(movement);

            if (inv.getStock().compareTo(inv.getMinStock()) < 0) {
                eventPublisher.publishStockUpdate(inv);
            }

            auditService.logAction(1L, "UPDATE_STOCK", "Inventario", inv.getProductId(), "Stock updated: " + quantity);
        }

        @Override
        public List<InventarioInformacionDTO> getLowStockProducts() {
            return inventoryRepository.findByQuantityLessThanMinStock().stream().map(this::toInventarioInformacion).toList();
        }

        @Override
        public List<InventarioRespuestaDTO> getCatalogoActivo(Long branchId) {
            return inventoryRepository.findActiveCatalogByBranch(branchId);
        }

        private ProductoInformacionDTO toInformacionDTO(Producto product) {
            return new ProductoInformacionDTO(
                    product.getId(),
                    product.getName(),
                    product.getSku(),
                    product.getUnitType(),
                    product.getAverageCost()
            );
        }

        private ProductoDetalleDTO toDetalleDTO(Producto product) {
            return new ProductoDetalleDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getSku(),
                    product.getUnitType(),
                    product.getAverageCost()
            );
        }

        private InventarioInformacionDTO toInventarioInformacion(Inventario inventory) {
            return new InventarioInformacionDTO(
                    inventory.getBranchId(),
                    inventory.getProductId(),
                    inventory.getStock(),
                    inventory.getMinStock()
            );
        }
    }



