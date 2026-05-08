<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Producto.php";

try {
    $nombre = trim($_POST["nombre"] ?? "");
    $categoria = trim($_POST["categoria"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");
    $precio = $_POST["precio"] ?? "";

    if ($nombre === "" || $categoria === "" || $descripcion === "" || $precio === "") {
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

    if (!isset($_FILES["imagen"]) || $_FILES["imagen"]["error"] !== UPLOAD_ERR_OK) {
        echo json_encode([
            "success" => false,
            "message" => "Debes seleccionar una imagen válida."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $archivo = $_FILES["imagen"];
    $extension = strtolower(pathinfo($archivo["name"], PATHINFO_EXTENSION));
    $extensionesPermitidas = ["jpg", "jpeg", "png", "webp"];

    if (!in_array($extension, $extensionesPermitidas)) {
        echo json_encode([
            "success" => false,
            "message" => "Solo se permiten imágenes JPG, JPEG, PNG o WEBP."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $nombreArchivo = "producto_" . time() . "_" . rand(1000, 9999) . "." . $extension;
    $rutaCarpeta = __DIR__ . "/../assets/productos/";
    $rutaDestino = $rutaCarpeta . $nombreArchivo;

    if (!is_dir($rutaCarpeta)) {
        mkdir($rutaCarpeta, 0777, true);
    }

    if (!move_uploaded_file($archivo["tmp_name"], $rutaDestino)) {
        echo json_encode([
            "success" => false,
            "message" => "No se pudo guardar la imagen en el servidor."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $rutaImagenBD = "assets/productos/" . $nombreArchivo;

    $producto = new Producto();
    $resultado = $producto->registrar($nombre, $categoria, $descripcion, $precio, $rutaImagenBD);

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Producto registrado correctamente." : "No se pudo registrar el producto."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar producto.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}