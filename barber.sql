-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2024 a las 21:37:33
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `barber`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `day` date NOT NULL,
  `hour` time NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `barber_id` int(11) DEFAULT NULL,
  `style` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `reservations`
--

INSERT INTO `reservations` (`id`, `day`, `hour`, `client_id`, `barber_id`, `style`) VALUES
(21, '2024-06-01', '19:30:00', 5, 1, 1),
(23, '2024-05-31', '13:00:00', 5, 1, 2),
(25, '2024-06-27', '20:30:00', 5, 1, 1),
(26, '2024-06-22', '18:00:00', 6, 1, 1),
(27, '2024-06-22', '18:30:00', 6, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `styles`
--

CREATE TABLE `styles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `styles`
--

INSERT INTO `styles` (`id`, `name`) VALUES
(1, 'Corte sencillo'),
(2, 'Corte con barba'),
(3, 'Teñir pelo'),
(7, 'Corte fasilito primiko'),
(8, 'dasdasdad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `role` varchar(2555) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `role`, `username`, `password`) VALUES
(1, 'David Guerra', 'dguerramoruno@gmail.com', '605930289', 'barber', 'dguerra', 'Marianao123'),
(2, 'Pau tienda', 'pautiendapfi@gmail.com', '605930289', 'barber', 'pautienda', 'Marianao123'),
(4, 'Javi', 'javi@gmail.com', '605498234', 'client', 'javi', 'Marianao123'),
(5, 'Idaira', 'id@gmail.com', '505032234', 'barber', 'test', '$2b$10$rVNeZ/DuxzmEaRQqkt3gO.wpI8w5FmBB1MpIL1gp/OCODDp2iWNN6'),
(6, 'Edgar', 'edg@gmail.com', '605930289', 'client', 'testing', '$2b$10$5O3IaUf5ufgALKtF9m2iEu8WLDpGB/4VEg4q5JUeN6lUQr0fJJEKe'),
(8, 'test', 'test@gmail.com', '605930289', 'client', 'test', '$2b$10$iBFlQfD33rxokOtEXLw4MuWAGkktd9yPjDNhsfhAA/h4TXf19LACm'),
(10, 'client', 'dguerramorun23o@gmail.com', '605930289', 'client', 'dguerratest', '$2b$10$MfVd4weWheFXlNoDLe.7EeR7jqDySUQKJu0f9fgmMKir7G7vLQIza'),
(11, 'client', 'dguerramorun233o@gmail.com', '605930289', 'Marianao123', 'dguerratest', '$2b$10$OCWVespPt/Ly.beJ5gnHIu/BaYpMpbr90CD.6Ej3hSgeHqudpp34K'),
(13, 'dasdasdasd', 'dguerramoru234324no@gmail.com', '605930289', 'barber', 'marcdps', '$2b$10$XVO4kKtZN1.HMmVq5oVQWed0bRZQWdOo4Q66YWgGr.sTNj97YZQ7a'),
(15, 'sasadasdas', '2334412@gmail.com', '605930289', 'client', 'dguerratest', '$2b$10$94hbYIStCEaAAAF427dTjeRvvknRbaaSuelD6BbPvzT146g4RX09q'),
(16, 'Alejandro', 'ale@gmail.com', '605930289', 'barber', 'sdasdadsasd', '$2b$10$FjCPZiSKJ3RE7Y/ddkWcSeZoYNUQYJTLF3tLBOwGttppK7P8miMFe'),
(17, 'sdasdasd', 'asdasd@gmail.com', '605930218', 'client', 'testing', '$2b$10$55o6hhXiu7Wf0tVs8dvaf.wpiym3tLXwGjnQrUMBFaRD9LGA6XnkC'),
(19, 'sdasdasd', 'asda321312sd@gmail.com', '605930218', 'client', 'testing', '$2b$10$LUzb6SMNBuHn.ZtmfP3olu03jnLVW3R0lvC3SzpNr.4ytAHJneYy2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `barber_id` (`barber_id`),
  ADD KEY `style` (`style`);

--
-- Indices de la tabla `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `styles`
--
ALTER TABLE `styles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`barber_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`style`) REFERENCES `styles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
