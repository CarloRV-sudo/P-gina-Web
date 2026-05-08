<?php

require_once __DIR__ . "/../config/Conexion.php";

class Usuario {
    private $conexion;

    public function __construct() {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function obtenerTodos() {
        $sql = "SELECT 
                    u.id_usuario,
                    u.nombre,
                    u.correo,
                    r.nombre_rol,
                    u.activo,
                    u.fecha_registro
                FROM usuarios u
                INNER JOIN roles r ON u.id_rol = r.id_rol
                WHERE u.activo = 1
                ORDER BY u.id_usuario ASC";

        $stmt = $this->conexion->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function registrar($nombre, $correo, $password, $idRol) {
        $passwordCifrada = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nombre, correo, password, id_rol, activo)
                VALUES (:nombre, :correo, :password, :id_rol, 1)";

        $stmt = $this->conexion->prepare($sql);

        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":password", $passwordCifrada);
        $stmt->bindParam(":id_rol", $idRol);

        return $stmt->execute();
    }

    public function modificar($idUsuario, $nombre, $correo, $idRol) {
        $sql = "UPDATE usuarios
                SET nombre = :nombre,
                    correo = :correo,
                    id_rol = :id_rol
                WHERE id_usuario = :id_usuario
                AND activo = 1";

        $stmt = $this->conexion->prepare($sql);

        $stmt->bindParam(":id_usuario", $idUsuario);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":id_rol", $idRol);

        return $stmt->execute();
    }

    public function modificarPassword($idUsuario, $password) {
        $passwordCifrada = password_hash($password, PASSWORD_DEFAULT);

        $sql = "UPDATE usuarios
                SET password = :password
                WHERE id_usuario = :id_usuario
                AND activo = 1";

        $stmt = $this->conexion->prepare($sql);

        $stmt->bindParam(":id_usuario", $idUsuario);
        $stmt->bindParam(":password", $passwordCifrada);

        return $stmt->execute();
    }

    public function eliminar($idUsuario) {
        $sql = "UPDATE usuarios
                SET activo = 0
                WHERE id_usuario = :id_usuario";

        $stmt = $this->conexion->prepare($sql);
        $stmt->bindParam(":id_usuario", $idUsuario);

        return $stmt->execute();
    }

    public function correoExiste($correo) {
        $sql = "SELECT id_usuario 
                FROM usuarios 
                WHERE correo = :correo 
                AND activo = 1";

        $stmt = $this->conexion->prepare($sql);
        $stmt->bindParam(":correo", $correo);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }
}