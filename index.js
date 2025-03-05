// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// });

// console.log("Modo actual:", process.env.NODE_ENV);
// console.log("Base de datos host:", process.env.DB_HOST);


// // Importar fichero de configuración con variables de entorno
// const config = require("./config/config");
// // Importar librería express --> web server
// const express = require("express");
// // Importar librería path, para manejar rutas de ficheros en el servidor
// const path = require("path");
// // Importar libreria CORS
// // const cors = require("cors");
// // Importar librería de manejo de cookies
// const cookieParser = require("cookie-parser");
// // Importar gestores de rutas
// const clienteRoutes = require("./routes/clienteRoutes");
// const entradaRoutes = require("./routes/entradaRoutes");


// const app = express();

// // Configurar middleware para analizar JSON en las solicitudes
// app.use(express.json());

// // Configurar CORS para admitir cualquier origen
// const cors = require("cors");

// const allowedOrigins = [
//   "http://localhost:3000",  // Para desarrollo local
//   "https://cine2425-production.up.railway.app:8080" // Para producción (ajusta si es necesario)
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // Permite envío de cookies y headers autenticados
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   })
// );

// // app.use(cors()); // No permitite el envío de cookies en una API pública

// // if (process.env.NODE_ENV !== "production") {
// //   // Configurar CORS para admitir el origen del frontend en desarrollo
// //   app.use(
// //     cors({
// //       origin: "http://localhost:5173", // Permitir el frontend en desarrollo de React
// //       //origin: "http://localhost:8081", // Permitir el frontend en desarrollo de React Native
// //       credentials: true, // Permitir envío de cookies
// //     })
// //   );
// // }

// // Habilitar el análisis de cookies
// app.use(cookieParser());


// //Ruta para manejar las solicitudes al archivo index.html

// // app.get('/', (req, res) => {

//   // Configurar el middleware para servir archivos estáticos desde el directorio public/dev en producción
//   app.use(express.static(path.join(__dirname, "public")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
//   });



// // Iniciar el servidor solo si no estamos en modo de prueba
// // en modo de prueba, el servidor se inicia en el archivo de prueba
//   app.listen(config.port, () => {
//     console.log(`Servidor escuchando en el puerto ${config.port}`);
//   });

// // Exportamos la aplicación para poder hacer pruebas
// module.exports = app;
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

console.log("Modo actual:", process.env.NODE_ENV);
console.log("Base de datos host:", process.env.DB_HOST);

// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar librería CORS
const cors = require("cors");
// Importar librería de manejo de cookies
const cookieParser = require("cookie-parser");
// Importar gestores de rutas
const clienteRoutes = require("./routes/clienteRoutes");
const entradaRoutes = require("./routes/entradaRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

// Configurar CORS para admitir cualquier origen
const allowedOrigins = [
  "http://localhost:3000",  // Para desarrollo local
  "http://localhost:5173",
  "https://cine2425-production.up.railway.app", // Para producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (por ejemplo, desde Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS no permitido"));
    },
    credentials: true, // Permite envío de cookies y headers autenticados
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  })
);

// Habilitar el análisis de cookies
app.use(cookieParser());

// Configurar el middleware para servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, "public")));

// Rutas del API
app.use("/api/cliente", clienteRoutes);
app.use("/api/entrada", entradaRoutes);

// Ruta para manejar cualquier solicitud no coincidente y devolver el frontend (index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});

// Exportamos la aplicación para pruebas
module.exports = app;
