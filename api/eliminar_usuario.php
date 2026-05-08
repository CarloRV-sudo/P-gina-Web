<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/../modelos/Usuario.php";

try {
    $datos = json_decode(file_get_contents("php://input"), true);

    $idUsuario = $datos["id_usuario"] ?? "";

    if ($idUsuario === "") {
        echo json_encode([
            "success" => false,
            "message" => "El ID del usuario es obligatorio."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $usuario = new Usuario();
    $resultado = $usuario->eliminar($idUsuario);

    echo json_encode([
        "success" => $resultado,
        "message" => $resultado ? "Usuario eliminado correctamente." : "No se pudo eliminar el usuario."
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar usuario.",
        "error" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}