<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Usuario.php";

try {
    $entrada = file_get_contents("php://input");
    $datos = json_decode($entrada, true);

    if (!$datos) {
        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $correo = trim($datos["email"] ?? "");
    $password = trim($datos["password"] ?? "");

    if ($correo === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "Correo y contraseña son obligatorios."
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

    $usuarioModelo = new Usuario();
    $usuario = $usuarioModelo->obtenerPorCorreo($correo);

    if (!$usuario) {
        echo json_encode([
            "success" => false,
            "message" => "El correo no está registrado."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!password_verify($password, $usuario["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "La contraseña es incorrecta."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $_SESSION["id_usuario"] = $usuario["id_usuario"];
    $_SESSION["nombre"] = $usuario["nombre"];
    $_SESSION["correo"] = $usuario["correo"];
    $_SESSION["id_rol"] = $usuario["id_rol"];
    $_SESSION["rol"] = $usuario["nombre_rol"];

    echo json_encode([
        "success" => true,
        "message" => "Inicio de sesión correcto.",
        "usuario" => [
            "id_usuario" => $usuario["id_usuario"],
            "nombre" => $usuario["nombre"],
            "correo" => $usuario["correo"],
            "rol" => $usuario["nombre_rol"]
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error interno al iniciar sesión."
    ], JSON_UNESCAPED_UNICODE);
}