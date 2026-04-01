package com.inventory.modelo.entidades.seguridad;

import com.inventory.modelo.enums.Rol;
import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad que representa un usuario del sistema de inventario.
 */
@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellido", nullable = false)
    private String apellido;

    @Column(name = "email", unique = true, nullable = false)
    private String correo;

    @Column(name = "password_hash", nullable = false)
    private String contrasena;

    @Convert(converter = ConversorRol.class)
    @Column(name = "roles_id_rol", nullable = false)
    private Rol rol;

    @Column(name = "id_sucursal_asignada")
    private Long sucursalAsignadaId;

    @Builder.Default
    @Column(name = "activo", nullable = false)
    private Boolean activo = true;

    @Column(name = "motivo_inactivacion", columnDefinition = "TEXT")
    private String motivoInactivacion;
}
