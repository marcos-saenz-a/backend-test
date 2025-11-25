# Prueba Técnica — Backend Developer (Node.js + Express + MongoDB)

Este proyecto es una API desarrollada como parte de una prueba técnica para el puesto de Desarrollador Backend.

El objetivo es gestionar usuarios y los libros asociados a cada usuario mediante una relación uno a muchos, utilizando Express, MongoDB, Mongoose y buenas prácticas de arquitectura y control de versiones (Git Flow).

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Nodemon (desarrollo)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/marcos-sanz-a/backend-test.git
cd backend-test
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar archivo `.env`

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/backend_test
```

Asegúrate de tener un servidor MongoDB local en ejecución.

## Ejecución del proyecto

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

Si todo está correcto, aparecerá en cosola:

```
MongoDB connected
Server running on http://localhost:3000
```

## Estructura del Proyecto

```
/src
  /controllers
    user.controller.js
    book.controller.js
  /models
    user.model.js
    book.model.js
  /routes
    user.routes.js
    book.routes.js
  /db
    connection.js
  app.js
server.js
.env
```

## Endpoints: Usuarios

Base URL: `/users`

### Crear usuario

POST `/users`

Body:

```json
{
  "name": "Marco",
  "email": "marco@example.com"
}
```

### Listar usuarios

GET `/users`

### Actualizar usuario

PUT `/users/:id`

Body:

```json
{
  "name": "Nuevo nombre"
}
```

### Eliminar usuario

DELETE `/users/:id`

## Endpoints: Libros

Base URL: `/books`

### Crear libro asociado a un usuario

POST `/books`

Body:

```json
{
  "userId": "ID_DEL_USUARIO",
  "title": "Harry Potter",
  "author": "J.K. Rowling"
}
```

Validaciones:

- El usuario debe existir.
- Un usuario no puede tener dos libros con el mismo título.

### Listar libros de un usuario

GET `/books/user/:userId`

### Actualizar libro

PUT `/books/:id`

Body:

```json
{
  "title": "Nuevo título"
}
```

### Eliminar libro

DELETE `/books/:id`

## Manejo de Errores

La API utiliza códigos de estado HTTP adecuados:

- 400: Datos incompletos
- 404: Usuario o libro no encontrado
- 409: Libro duplicado para el mismo usuario
- 500: Error interno del servidor

## Relación entre Usuarios y Libros

Se implementa una relación uno a muchos.

Cada libro tiene un `userId` que referencia a un usuario.

Para evitar duplicados, se utiliza un índice compuesto en MongoDB:

```jsx
bookSchema.index({ title: 1, userId: 1 }, { unique: true });
```