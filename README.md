# VeteriAPI - Backend

API REST desarrollada para la gestión de una veterinaria. Permite administrar usuarios, mascotas, veterinarios y turnos, con autenticación mediante JSON Web Tokens (JWT) y una base de datos MongoDB.

## Datos del alumno

- **Nombre y apellido:** Agostina Gamboa Straus
- **Materia:** Aplicaciones Híbridas
- **Docente:** Jonathan Emanuel Cruz
- **Comisión:** [26-2][DWN4AV]

## Tecnologías utilizadas

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Dotenv
- Multer
- CORS

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Encriptación de contraseñas.
- Gestión de mascotas.
- Gestión de veterinarios.
- Gestión de turnos.
- Control de acceso según el rol del usuario.
- Carga de imágenes de perfil.

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/agostinaChina

2. Ingresar a la carpeta:

    cd VeteriAPI

3. Instalar las dependencias:

npm install

4. Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=
MONGODB_URI=
MONGODB_URI2=
SECRET_KEY=

Completar cada variable con los valores correspondientes de configuración.

5. Iniciar el servidor en modo desarrollo:

npm run dev

La API esta disponible en http://localhost:5000, si el puerto configurado es 5000.

ase de datos

El proyecto utiliza MongoDB y Mongoose para la conexión y el modelado de datos.

Frontend

Este backend trabaja junto con la aplicación frontend desarrollada en React.

Repositorio del frontend: https://github.com/agostinaChina/VeteriAPI-Frontend