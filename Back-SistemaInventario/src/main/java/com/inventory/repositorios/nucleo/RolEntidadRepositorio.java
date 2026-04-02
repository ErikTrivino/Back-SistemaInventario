package com.inventory.repositorios.nucleo;

import com.inventory.modelo.entidades.nucleo.RolEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolEntidadRepositorio extends JpaRepository<RolEntidad, Long> {
}
