-- Crear la base de datos
CREATE DATABASE cine;
USE cine;

-- Tabla de Clientes
CREATE TABLE clientes (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15) NOT NULL
);

-- Tabla de Entradas (relacionada con Clientes)
CREATE TABLE entradas (
    identrada INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT NOT NULL,
    pelicula VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (idcliente) REFERENCES clientes(idcliente) ON DELETE CASCADE
);

-- Insertar datos en Clientes
INSERT INTO clientes (nombre, email, telefono) VALUES
('Juan Pérez', 'juan.perez@email.com', '654123789'),
('María Gómez', 'maria.gomez@email.com', '678456123'),
('Carlos López', 'carlos.lopez@email.com', '622789456');

-- Insertar datos en Entradas
INSERT INTO entradas (idcliente, pelicula, fecha, hora, precio) VALUES
(1, 'Avatar 2', '2025-02-10', '18:30:00', 9.50),
(1, 'Oppenheimer', '2025-02-12', '21:00:00', 8.75),
(2, 'Barbie', '2025-02-11', '19:00:00', 10.00),
(3, 'Dune: Parte 2', '2025-02-13', '20:30:00', 9.00);
