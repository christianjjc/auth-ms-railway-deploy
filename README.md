<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# AUTH APP STARTER v1.0.0 (2024-oct-10)

### NestJs, typeOrm, Postgres, JWT, Joi, bcrypt

### Pasos para iniciar el Proyecto

1. Clonar el repositorio [Enlace Repositorio]

   ```
   git clone https://github.com/CJDEV-01/auth-ms.git
   ```

2. Dirigirse a la rama con el commit más reciente:

   ```
   git checkout <nombre_rama>
   ```

3. Instalar las dependencias:

   ```
   npm install
   ```

4. Clonar el archivo `.env.template` como `.env`

5. Colocar las variables de entorno necesarias:

   - `Del Servidor:`

     - PORT= Colocar el puerto en el que quieres que corra el servidor.

   - `Para Docker`

     - DB_PASSWORD= Clave de usuario de la base de datos
     - DB_NAME= Nombre de la base de datos
     - DB_HOST= Si vas a hacer pruebas en local `localhost`
     - DB_PORT= Puerto para que corra la bd (por ejem: `5432`)
     - DB_USERNAME= Nombre de Usuario de la base de datos

   - `Para Json Web Token`

     - JWT_SECRET= El secreto para la generación de Tokens con JWT (`puede ser cualquier texto`)

   - `Para cookies`

     - COOKIE_SECRET= El secreto para la firma de cookies (`puede ser cualquier texto`)
     - COOKIE_JWT_TOKEN_KEY_SERVICE= este es el nombre que tendrá cada cookie creada(`puede ser cualquier texto`)

   - `Para Cloudinary`

     - URL_TO_DEFAULT_USER_IMAGE=https://res.cloudinary.com
       `# URL: https://console.cloudinary.com/`
     - CLOUDINARY_CLOUD_NAME=
     - CLOUDINARY_API_KEY=
     - CLOUDINARY_API_SECRET=
     - CLOUDINARY_UPLOAD_FOLDER=

6. Levantar la base de datos Postgres en modo `detached` con el `docker-compose.yml`

   ```
   docker compose up -d
   ```

7. Iniciar el proyecto:

   ```
   npm run start:dev
   ```

8. Inicializar la base de datos [Enlace SeedData]

   ```
   http://localhost:3000/api/seed
   ```

9. Abrir `Postman` u otro cliente e iniciar sesión:

   - Method: `Post`
   - Ruta: `http://localhost:3000/api/auth/login`
   - Body/raw/Json:

     ```json
     // Enviar uno solo de los objetos.

     {
       "email": "user2@example.com",
       "password": "Abc123"
     }
     ```

10. Hacer la consulta de `Roles`:

    - Method: `Get`
    - Ruta: `http://localhost:3000/api/roles`
    - Bearer Token: <`Enviar el token generado en el login`>

11. Hacer la consulta de `Usuarios`:

    - Method: `Get`
    - Ruta: `http://localhost:3000/api/users`
    - Bearer Token: <`Enviar el token generado en el login`>

[Enlace Repositorio]: https://github.com/christianjjc/auth-ms-railway-deploy.git
[Enlace SeedData]: http://localhost:3000/api/seed
