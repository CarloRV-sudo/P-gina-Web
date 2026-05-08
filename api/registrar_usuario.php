<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Usuario.php";

try {
    $datos = json_decode(file_get_contents("php://input"), true);

    $nombre = trim($datos["nombre"] ?? "");
    $correo = trim($datos["correo"] ?? "");
    $password = trim($datos["password"] ?? "");
    $idRol = $datos["id_rol"] ?? "";

    if ($nombre === "" || $correo === "" || $password === "" || $idRol === "") {
        echo json_encode([
            "success" => false,
            "message" => "Todos los campos son obligatorios."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "El correo no tiene un formato válido."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode([
            "success" => false,
            "message" => "La contraseña debe tener al menos 6 caracteres."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $usuario = new Usuario();

    if ($usuario->correoExiste($correo)) {
        echo json_encode([
            "success" => false,
            "message" => "El correo ya está registrado."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $resultado = $usuario->registrar($nombre, $correo, $password, $idRol);

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Usuario registrado correctamente." : "No se pudo registrar el usuario."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar usuario.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}