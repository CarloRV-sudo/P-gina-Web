<?php

session_start();

header("Content-Type: application/json; charset=utf-8");

if (isset($_SESSION["id_usuario"])) {
    echo json_encode([
        "logueado" => true,
        "usuario" => [
            "id_usuario" => $_SESSION["id_usuario"],
            "nombre" => $_SESSION["nombre"],
            "correo" => $_SESSION["correo"],
            "id_rol" => $_SESSION["id_rol"],
            "rol" => $_SESSION["rol"]
        ]
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        "logueado" => false,
        "usuario" => null
    ], JSON_UNESCAPED_UNICODE);
}