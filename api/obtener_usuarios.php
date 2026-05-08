<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Usuario.php";

try {
    $usuario = new Usuario();
    $usuarios = $usuario->obtenerTodos();

    echo json_encode([
        "success" => true,
        "data" => $usuarios
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener usuarios.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}