package com.inventory.servicios.seguridad;

import com.inventory.modelo.dto.seguridad.UsuarioRequestDTO;
import com.inventory.modelo.dto.seguridad.UsuarioResponseDTO;
import com.inventory.modelo.entidades.seguridad.Usuario;
import com.inventory.modelo.enums.Rol;
import com.inventory.repositorios.seguridad.UsuarioRepositorio;
import com.inventory.servicios.implementaciones.seguridad.UsuarioServicioImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsuarioServicioTest {

    @InjectMocks
    private UsuarioServicioImpl usuarioServicio;

    @Mock
    private UsuarioRepositorio usuarioRepositorio;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void testCrearUsuario() throws Exception {
        UsuarioRequestDTO request = UsuarioRequestDTO.builder()
                .nombre("Juan")
                .apellido("Perez")
                .email("juan.perez@example.com")
                .password("securePass123")
                .rol(Rol.OPERATOR)
                .sucursalAsignadaId(1L)
                .activo(true)
                .build();

        // Simular codificación de password
        when(passwordEncoder.encode(any())).thenReturn("encodedPass");

        // Simular guardado de usuario
        when(usuarioRepositorio.save(any(Usuario.class))).thenAnswer(invocation -> {
            Usuario user = invocation.getArgument(0);
            if (user.getId() == null) {
                user.setId(1L);
            }
            return user;
        });

        UsuarioResponseDTO resultado = usuarioServicio.crearUsuario(request);

        assertNotNull(resultado);
        assertNotNull(resultado.getId());
    }

    @Test
    void testConsultarPorId() throws Exception {
        Usuario mockUser = new Usuario();
        mockUser.setId(1L);
        mockUser.setNombre("Juan");
        
        when(usuarioRepositorio.findById(1L)).thenReturn(Optional.of(mockUser));

        UsuarioResponseDTO usuario = usuarioServicio.consultarPorId(1L);
        assertNotNull(usuario);
        assertEquals("Juan", usuario.getNombre());
    }

    @Test
    void testActualizarUsuario() throws Exception {
        Usuario mockUser = new Usuario();
        mockUser.setId(1L);
        
        when(usuarioRepositorio.findById(1L)).thenReturn(Optional.of(mockUser));
        when(usuarioRepositorio.save(any(Usuario.class))).thenAnswer(i -> i.getArgument(0));

        UsuarioRequestDTO request = UsuarioRequestDTO.builder()
                .nombre("Juan Actualizado")
                .rol(Rol.MANAGER)
                .build();

        UsuarioResponseDTO resultado = usuarioServicio.actualizarUsuario(1L, request);
        
        assertNotNull(resultado);
        assertEquals("Juan Actualizado", resultado.getNombre());
    }

    @Test
    void testInactivarUsuario() throws Exception {
        Usuario mockUser = new Usuario();
        mockUser.setId(1L);
        
        when(usuarioRepositorio.findById(1L)).thenReturn(Optional.of(mockUser));

        assertDoesNotThrow(() -> 
            usuarioServicio.inactivarUsuario(1L, "Retiro voluntario"));
    }

    @Test
    void testFiltrarPorSucursal() throws Exception {
        when(usuarioRepositorio.findBySucursalAsignadaId(1L)).thenReturn(List.of());
        List<UsuarioResponseDTO> usuarios = usuarioServicio.filtrarPorSucursal(1L);
        assertNotNull(usuarios);
    }
}
