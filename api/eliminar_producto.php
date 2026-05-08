<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Producto.php";

try {
    $datos = json_decode(file_get_contents("php://input"), true);

    $idProducto = $datos["id_producto"] ?? "";

    if ($idProducto === "") {
        echo json_encode([
            "success" => false,
            "message" => "El ID del producto es obligatorio."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $producto = new Producto();
    $resultado = $producto->eliminar($idProducto);

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Producto eliminado correctamente." : "No se pudo eliminar el producto."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar producto.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}