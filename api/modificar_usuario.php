<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Usuario.php";

try {
    $datos = json_decode(file_get_contents("php://input"), true);

    $idUsuario = $datos["id_usuario"] ?? "";
    $nombre = trim($datos["nombre"] ?? "");
    $correo = trim($datos["correo"] ?? "");
    $idRol = $datos["id_rol"] ?? "";
    $password = trim($datos["password"] ?? "");

    if ($idUsuario === "" || $nombre === "" || $correo === "" || $idRol === "") {
        echo json_encode([
            "success" => false,
            "message" => "ID, nombre, correo y rol son obligatorios."
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

    $usuario = new Usuario();

    $resultado = $usuario->modificar($idUsuario, $nombre, $correo, $idRol);

    if ($password !== "") {
        if (strlen($password) < 6) {
            echo json_encode([
                "success" => false,
                "message" => "La nueva contraseña debe tener al menos 6 caracteres."
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $usuario->modificarPassword($idUsuario, $password);
    }

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Usuario modificado correctamente." : "No se pudo modificar el usuario."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al modificar usuario.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}