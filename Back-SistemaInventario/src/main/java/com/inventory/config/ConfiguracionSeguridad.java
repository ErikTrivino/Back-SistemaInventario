package com.inventory.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración web y de filtros del sistema de inventario.
 *
 * Esta clase reemplaza ConfiguracionSeguridad de Spring Security,
 * registrando manualmente nuestro FiltroToken en el contenedor de Servlets.
 */
@Configuration
@RequiredArgsConstructor
public class ConfiguracionSeguridad {

    private final FiltroToken filtroToken;

    /**
     * Registra el FiltroToken para interceptar todas las peticiones /api/**.
     * Al no usar Spring Security, el registro se realiza como un FilterRegistrationBean
     * estándar de Java/Spring.
     */
    @Bean
    public FilterRegistrationBean<FiltroToken> registroFiltroToken() {
        FilterRegistrationBean<FiltroToken> registrationBean = new FilterRegistrationBean<>();

        // Establecer nuestra instancia del filtro
        registrationBean.setFilter(filtroToken);

        // Definir los patrones de URL que interceptará (toda la API)
        registrationBean.addUrlPatterns("/api/*");

        // Prioridad del filtro (un valor bajo para que se ejecute primero)
        registrationBean.setOrder(1);

        return registrationBean;
    }
}
