package com.inventory.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.modelo.dto.comun.MensajeDTO;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * Filtro personalizado que intercepta todas las solicitudes HTTP
 * para validar el token JWT y establecer la autenticación en el contexto de seguridad.
 */
@Component
@RequiredArgsConstructor
public class FiltroToken extends OncePerRequestFilter {

    private final JWTUtils jwtUtils;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // El manejo de CORS ahora se realiza en ConfiguracionSeguridad via CorsConfigurationSource
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String token = getToken(request);

        if (token != null) {
            try {
                // Validación y extracción de claims
                Jws<Claims> jws = jwtUtils.parseJwt(token);
                String email = jws.getPayload().getSubject();
                String rol = jws.getPayload().get("rol").toString();

                // Crear objeto de autenticación para Spring Security
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + rol))
                );

                // Establecer la autenticación en el contexto global de la petición
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (MalformedJwtException | SignatureException e) {
                crearRespuestaError("El token es incorrecto", HttpServletResponse.SC_UNAUTHORIZED, response);
                return;
            } catch (ExpiredJwtException e) {
                crearRespuestaError("El token está vencido", HttpServletResponse.SC_UNAUTHORIZED, response);
                return;
            } catch (Exception e) {
                crearRespuestaError(e.getMessage(), HttpServletResponse.SC_INTERNAL_SERVER_ERROR, response);
                return;
            }
        }

        // Continuar con el siguiente filtro en la cadena
        filterChain.doFilter(request, response);
    }

    private String getToken(HttpServletRequest req) {
        String header = req.getHeader("Authorization");
        return header != null && header.startsWith("Bearer ")
                ? header.replace("Bearer ", "")
                : null;
    }

    private void crearRespuestaError(String mensaje, int codigoError, HttpServletResponse response) throws IOException {
        MensajeDTO<String> dto = new MensajeDTO<>(true, mensaje);
        response.setContentType("application/json");
        response.setStatus(codigoError);
        response.getWriter().write(new ObjectMapper().writeValueAsString(dto));
        response.getWriter().flush();
        response.getWriter().close();
    }
}


