🚀 Aplicación de Autenticación Fullstack - Prueba en vivo aquí 👉 [Ir a la App](https://auth-front-o8kh.onrender.com/)

---

## 🧠 Descripción del Proyecto Backend

Este es el backend de una aplicación de autenticación completa construida con Node.js, Express y MongoDB. Proporciona las rutas necesarias para el registro de usuarios, inicio de sesión, obtención y actualización del perfil, incluyendo JWT para autenticación y protección de rutas.

🔗 **Deploy Backend:** https://auth-backend-14z7.onrender.com/  
📁 **Repositorio GitHub Backend:** https://github.com/Parkaston/auth-backend  
🖥️ **Frontend asociado:** https://auth-front-o8kh.onrender.com/

---

## 🧪 Testeos con Postman

Podés probar los endpoints usando Postman. A continuación te dejo algunos ejemplos:

### 1. 🔐 Registro de Usuario

**POST** `/api/register`  
📍 https://auth-backend-14z7.onrender.com/api/register

**Body (JSON):**
```json
{
  "username": "ejemplo",
  "email": "ejemplo@email.com",
  "password": "123456"
}
```

---

### 2. ✅ Login de Usuario

**POST** `/api/login`  
📍 https://auth-backend-14z7.onrender.com/api/login

**Body (JSON):**
```json
{
  "email": "ejemplo@email.com",
  "password": "123456"
}
```

✅ La respuesta incluirá un **token JWT** que deberás usar para acceder a rutas protegidas.

---

### 3. 👤 Obtener Perfil

**GET** `/api/profile`  
📍 https://auth-backend-14z7.onrender.com/api/profile  
🔐 Requiere Header con token:

**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

---

### 4. 📝 Actualizar Perfil (Editar nombre, email o descripción)

**PUT** `/api/profile`  
📍 https://auth-backend-14z7.onrender.com/api/profile  
🔐 Requiere token

**Body (JSON):**
```json
{
  "username": "nuevoNombre",
  "email": "nuevo@email.com",
  "description": "Esta es mi descripción"
}
```





### 📬 Colección de Postman
Se incluye una colección de Postman con pruebas básicas para verificar el funcionamiento de los endpoints de la API.

🔗 Archivo disponible en: /postman/auth-collection.json

La colección incluye:

Endpoint	Método	Descripción
/api/register	POST	Registra un nuevo usuario con username, email y password
/api/login	POST	Inicia sesión y devuelve un token JWT
/api/profile	GET	Devuelve los datos del perfil del usuario autenticado
/api/profile	PUT	Permite actualizar el perfil del usuario

💡 Nota: El token JWT obtenido en la ruta de login debe ser utilizado en los headers (Authorization: Bearer <token>) para acceder a los endpoints protegidos.

Podés importar fácilmente esta colección a Postman para realizar pruebas y validar el correcto funcionamiento de la autenticación.
---

## 🛠️ Tecnologías Utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt para hasheo de contraseñas
- CORS
- Dotenv

---

## 📦 Instalación local

1. Clonar el repositorio:

```bash
git clone https://github.com/Parkaston/auth-backend
cd auth-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con las siguientes variables:

```
PORT=3000
MONGODB_URI=tumongodburi
JWT_SECRET=tu_jwt_secreto
```

4. Ejecutar en desarrollo:

```bash
npm run dev
```

---

## 🙌 Autor

Desarrollado por **Guillermo Luna Álvarez** como proyecto final de Escuela Musk.  
👉 Frontend en: https://github.com/Parkaston/auth-front

---

📌 Recordá que el frontend ya está desplegado y completamente funcional en:  
➡️ https://auth-front-o8kh.onrender.com/
