<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Producto.php";

try {
    $producto = new Producto();
    $productos = $producto->obtenerTodos();

    echo json_encode([
        "success" => true,
        "data" => $productos
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener los productos.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}