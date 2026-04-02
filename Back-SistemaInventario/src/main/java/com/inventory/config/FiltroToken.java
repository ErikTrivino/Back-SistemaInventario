package com.inventory.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.modelo.dto.comun.MensajeDTO;
import com.inventory.modelo.enums.Rol;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro personalizado que intercepta todas las solicitudes HTTP
 * para validar el token JWT antes de permitir el acceso a los recursos protegidos.
 *
 * Este filtro:
 *
 *   Configura las cabeceras CORS necesarias.
 *   Extrae y valida el token JWT enviado en el encabezado {@code Authorization}.
 *   Permite o bloquea el acceso según el rol del usuario y la ruta solicitada.
 *
 *
 * Extiende {@link OncePerRequestFilter}, por lo que se ejecuta una sola vez
 * por cada petición HTTP.
 */
@Component
@RequiredArgsConstructor
public class FiltroToken extends OncePerRequestFilter {

    /** Utilidad para manejo y validación de tokens JWT. */
    private final JWTUtils jwtUtils;

    /**
     * Método principal del filtro: se ejecuta antes de procesar cada solicitud.
     *
     * @param request  petición HTTP entrante
     * @param response respuesta HTTP saliente
     * @param filterChain cadena de filtros para continuar el flujo de ejecución
     * @throws ServletException en caso de error del contenedor
     * @throws IOException en caso de error de entrada/salida
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // --- Configuración Global de CORS ---
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");

        // Manejo de peticiones Preflight (OPTIONS)
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {

            // URI del recurso solicitado
            String requestURI = request.getRequestURI();

            // Token JWT obtenido del encabezado Authorization
            String token = getToken(request);
            boolean error = true;

            try {
                // 1. Definir rutas públicas (permitir sin token)
                if (requestURI.startsWith("/api/auth/")) {
                    error = false;
                }
                // 2. Rutas de administración exclusivas (Solo ADMIN)
                else if (requestURI.startsWith("/api/admin/")) {
                    error = validarToken(token, Rol.ADMIN);
                }
                // 3. Rutas de reportes (Solo MANAGER y ADMIN)
                else if (requestURI.startsWith("/api/reportes/")) {
                    error = validarToken(token, Rol.MANAGER, Rol.ADMIN);
                }
                // 4. Rutas operativas de inventario y proveedores (OPERATOR, MANAGER, ADMIN)
                else if (requestURI.startsWith("/api/proveedores/") || 
                         requestURI.startsWith("/api/inventario/") || 
                         requestURI.startsWith("/api/productos/") || 
                         requestURI.startsWith("/api/catalogo/") || 
                         requestURI.startsWith("/api/movimientos/")) {
                    
                    error = validarToken(token, Rol.OPERATOR, Rol.MANAGER, Rol.ADMIN);
                }
                // 5. Resto de rutas de la API (por defecto proteger para cualquier rol válido)
                else if (requestURI.startsWith("/api/")) {
                    error = validarToken(token, Rol.OPERATOR, Rol.MANAGER, Rol.ADMIN);
                }
                else {
                    // Rutas fuera de /api/ (si existen)
                    error = false;
                }

                // Si hay error de permisos o el token no es válido, se devuelve respuesta 403 o 401
                if (error) {
                    crearRespuestaError("No tiene permisos para acceder a este recurso",
                            HttpServletResponse.SC_FORBIDDEN, response);
                }

            } catch (MalformedJwtException | SignatureException e) {
                crearRespuestaError("El token es incorrecto o corrupto",
                        HttpServletResponse.SC_UNAUTHORIZED, response);
            } catch (ExpiredJwtException e) {
                crearRespuestaError("La sesión ha expirado. Inicie sesión de nuevo.",
                        HttpServletResponse.SC_UNAUTHORIZED, response);
            } catch (Exception e) {
                crearRespuestaError("Error de autenticación: " + e.getMessage(),
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR, response);
            }

            // Si no hay errores, se continúa con el flujo normal del request
            if (!error) {
                filterChain.doFilter(request, response);
            }
        }
    }

    /**
     * Extrae el token JWT del encabezado "Authorization" de la solicitud.
     *
     * @param req petición HTTP
     * @return el token JWT sin el prefijo "Bearer ", o {@code null} si no existe
     */
    private String getToken(HttpServletRequest req) {
        String header = req.getHeader("Authorization");
        return header != null && header.startsWith("Bearer ")
                ? header.replace("Bearer ", "")
                : null;
    }

    /**
     * Crea y envía una respuesta JSON con un mensaje de error personalizado.
     *
     * @param mensaje mensaje descriptivo del error
     * @param codigoError código HTTP que se devolverá
     * @param response objeto de respuesta HTTP
     * @throws IOException si ocurre un error al escribir la respuesta
     */
    private void crearRespuestaError(String mensaje, int codigoError, HttpServletResponse response) throws IOException {
        MensajeDTO<String> dto = new MensajeDTO<>(true, mensaje);

        response.setContentType("application/json");
        response.setStatus(codigoError);
        response.getWriter().write(new ObjectMapper().writeValueAsString(dto));
        response.getWriter().flush();
        response.getWriter().close();
    }

    /**
     * Valida un token JWT verificando que sea válido y que el rol coincida con alguno de los permitidos.
     *
     * @param token token JWT a validar
     * @param rolesPermitidos lista de roles que tienen acceso a la ruta
     * @return {@code true} si hay error o el token no es válido; {@code false} si el token es correcto
     */
    private boolean validarToken(String token, Rol... rolesPermitidos) {
        boolean error = true;

        if (token != null) {
            // Se analiza y valida el token JWT
            Jws<Claims> jws = jwtUtils.parseJwt(token);
            Rol rolUsuario = Rol.valueOf(jws.getPayload().get("rol").toString());

            // Verifica si el rol del usuario está en la lista de roles permitidos
            for (Rol rolPermitido : rolesPermitidos) {
                if (rolUsuario == rolPermitido) {
                    error = false;
                    break;
                }
            }
        }

        return error;
    }
}
