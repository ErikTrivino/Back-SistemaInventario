package com.inventory.repositorios.nucleo;

import com.inventory.modelo.entidades.nucleo.Sucursal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SucursalRepositorio extends JpaRepository<Sucursal, Long> {
}
