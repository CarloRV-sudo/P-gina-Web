<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Producto.php";

try {
    $datos = json_decode(file_get_contents("php://input"), true);

    $idProducto = $datos["id_producto"] ?? "";
    $nombre = trim($datos["nombre"] ?? "");
    $categoria = trim($datos["categoria"] ?? "");
    $descripcion = trim($datos["descripcion"] ?? "");
    $precio = $datos["precio"] ?? "";
    $imagen = trim($datos["imagen"] ?? "");

    if ($idProducto === "" || $nombre === "" || $categoria === "" || $descripcion === "" || $precio === "" || $imagen === "") {
        echo json_encode([
            "success" => false,
            "message" => "Todos los campos son obligatorios."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!is_numeric($precio) || $precio <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "El precio debe ser mayor a 0."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $producto = new Producto();
    $resultado = $producto->modificar($idProducto, $nombre, $categoria, $descripcion, $precio, $imagen);

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Producto modificado correctamente." : "No se pudo modificar el producto."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al modificar producto.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}