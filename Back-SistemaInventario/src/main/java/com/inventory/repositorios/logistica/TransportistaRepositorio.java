package com.inventory.repositorios.logistica;

import com.inventory.modelo.entidades.logistica.Transportista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportistaRepositorio extends JpaRepository<Transportista, Long> {
}
