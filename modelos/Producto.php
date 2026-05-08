<?php

require_once __DIR__ . "/../config/Conexion.php";

class Producto {
    private $conexion;

    public function __construct() {
        $db = new Conexion();
        $this->conexion = $db->conectar();
    }

    public function obtenerTodos() {
        $sql = "SELECT 
                    id_producto,
                    nombre,
                    categoria,
                    descripcion,
                    precio,
                    imagen
                FROM productos
                WHERE activo = 1
                ORDER BY id_producto ASC";

        $stmt = $this->conexion->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function registrar($nombre, $categoria, $descripcion, $precio, $imagen) {
        $sql = "INSERT INTO productos (nombre, categoria, descripcion, precio, imagen, activo)
                VALUES (:nombre, :categoria, :descripcion, :precio, :imagen, 1)";

        $stmt = $this->conexion->prepare($sql);

        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":categoria", $categoria);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":precio", $precio);
        $stmt->bindParam(":imagen", $imagen);

        return $stmt->execute();
    }

    public function modificar($idProducto, $nombre, $categoria, $descripcion, $precio, $imagen) {
        $sql = "UPDATE productos
                SET nombre = :nombre,
                    categoria = :categoria,
                    descripcion = :descripcion,
                    precio = :precio,
                    imagen = :imagen
                WHERE id_producto = :id_producto
                AND activo = 1";

        $stmt = $this->conexion->prepare($sql);

        $stmt->bindParam(":id_producto", $idProducto);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":categoria", $categoria);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":precio", $precio);
        $stmt->bindParam(":imagen", $imagen);

        return $stmt->execute();
    }

    public function eliminar($idProducto) {
        $sql = "UPDATE productos
                SET activo = 0
                WHERE id_producto = :id_producto";

        $stmt = $this->conexion->prepare($sql);
        $stmt->bindParam(":id_producto", $idProducto);

        return $stmt->execute();
    }
}