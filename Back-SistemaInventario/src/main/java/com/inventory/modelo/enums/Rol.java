package com.inventory.modelo.enums;

/**
 * Enum de roles del sistema de inventario.
 * Usado en los claims del token JWT para controlar el acceso
 * a los distintos prefijos de ruta.
 *
 * ADMIN → /api/admin/**
 * GERENTE → /api/manager/**
 * OPERADOR → /api/operator/**
 */
public enum Rol {
    ADMIN,
    GERENTE,
    OPERADOR
}
