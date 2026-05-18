-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2026 a las 06:18:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cafe_santa_rosa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `categoria`, `descripcion`, `precio`, `imagen`, `activo`) VALUES
(1, 'Latte Vainilla', 'Bebida', 'Bebida suave y cremosa con un toque dulce de vainilla.', 55.00, 'assets/latteVainilla.jpg', 1),
(3, 'Brownie', 'Postre', 'Postre de chocolate con nuez, perfecto para acompañar tu café.', 45.00, 'assets/brownie.jpg', 1),
(4, 'Mocha', 'Bebida', 'Bebida de café con chocolate y leche vaporizada.', 60.00, 'assets/productos/producto_1778208394_9136.jpg', 1),
(5, 'Latte Vainilla', 'Bebida', 'Café espresso con leche vaporizada y toque de vainilla.', 65.00, 'assets/latteVainilla.jpg', 1),
(6, 'Americano', 'Bebida', 'Café tradicional recién preparado.', 40.00, 'assets/cafeAmericano.jpeg', 1),
(7, 'Café Clásico', 'Bebida', 'Café clásico mexicano.', 30.00, 'assets/cafe.jpg', 1),
(8, 'Cold Brew', 'Bebida', 'Café frío infusionado.', 60.00, 'assets/coldBrew.jpg', 1),
(9, 'Capuchino', 'Bebida', 'Espresso con espuma cremosa.', 55.00, 'assets/capuchino.png', 1),
(10, 'Concha', 'Pan', 'Pan dulce tradicional recién horneado.', 25.00, 'assets/concha.jpg', 1),
(11, 'Rebanada de Chocolate', 'Postre', 'Rebanada de pastel de chocolate.', 50.00, 'assets/rebanadaChocolate.jpg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'Administrador', 'Usuario con permisos para administrar productos, servicios y usuarios.'),
(2, 'Empleado', 'Usuario con permisos limitados para consultar y apoyar en la operación.'),
(3, 'Cliente', 'Usuario registrado para consultar productos y servicios.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `password`, `id_rol`, `activo`, `fecha_registro`) VALUES
(1, 'Administrador General', 'admin@cafesantarosa.com', '$2y$10$YtIdjYlYvig/Hc/be8AMLeYN1sf8h3wm7wKsKspMLRzSKdzubBmJm', 1, 1, '2026-05-08 00:55:56'),
(19, 'vladimir', 'vladimir@dominio.com', '$2y$10$wADM5P0qem.ZhG1SGZPdiut/gJHa3kWom8T0fMyoc2JuMlMM80n.6', 3, 1, '2026-05-08 17:28:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
