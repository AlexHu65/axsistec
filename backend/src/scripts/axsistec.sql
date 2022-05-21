-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2022 a las 00:35:41
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `axsistec`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `_id` VARCHAR(255))  BEGIN 
	
	UPDATE users SET status = false WHERE id = _id;	 
	 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editPass` (IN `_id` VARCHAR(255), IN `_password` VARCHAR(255))  BEGIN 
	IF (SELECT id FROM users WHERE id = _id) THEN 
		UPDATE users 
		SET password = _password 
		WHERE id = _id; 
	END IF; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsers` ()  BEGIN 
	
	SELECT id, email, user, status, date, gender FROM users WHERE status = true;
		 
	 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `_id` VARCHAR(255), IN `_email` VARCHAR(255), IN `_user` VARCHAR(255), IN `_gender` TEXT)  BEGIN 
	IF (SELECT id FROM users WHERE id = _id) THEN 
		UPDATE users 
		SET email = _email, 
			user = _user, 
			gender = _gender
		WHERE id = _id; 
	END IF; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userAddOrEdit` (IN `_id` VARCHAR(255), IN `_email` VARCHAR(255), IN `_user` VARCHAR(255), IN `_password` VARCHAR(255), IN `_status` TINYINT, IN `_gender` TEXT, IN `_date` DATETIME)  BEGIN 
	IF (SELECT id FROM users WHERE id = _id AND status = true) THEN 
		UPDATE users 
		SET email = _email, 
			user = _user, 
			gender = _gender, 
			date = _date,
			password = _password
		WHERE id = _id; 
		 
	ELSE 
		INSERT INTO users (id, email, user, password, status, gender, date) 
		VALUES (_id, _email, _user, _password, _status, _gender, _date); 
	END IF; 
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `gender` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `user`, `password`, `status`, `gender`, `date`) VALUES
('1653169135689', 'alejandrotsu24@gmail.com', 'AlexHu66', 'UzFzdDNtQFMhOQ==', 1, 'Masculino', '2022-05-21 16:38:55'),
('1653171720348', 'alejandrotsu23@gmail.com', 'AlexHu62', 'UzFzdDNtQFMhOQ==', 1, 'Masculino', '2022-05-21 17:22:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user` (`user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
