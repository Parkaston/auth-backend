const request = require('supertest');          // Para hacer peticiones HTTP simuladas
const app = require('../app');             // Importamos nuestra app Express
const mongoose = require('mongoose');          // Para cerrar conexión luego
require('dotenv').config();

describe('API de Usuarios - Test básicos', () => {
//Inicializamos una variable token para almacenar el token de autenticación que generaremos
//al hacer el login
  let token = ''; 
//El usuario de prueba que vamos a registrar es dinamico para evitar conflictos
//relacionados a usuarios duplicados en la base de datos
 const testUser = {
  username: 'testuser',
  email: `testuser_${Date.now()}@example.com`,
  password: '12345678'
};

  // Antes de cualquier cosa, es necesario conectar la base de datos
  // lo hacemos una vez antes de todos los test para evitar varias conexiones innecesarias
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  // Y al terminar todos los test, cerramos la conexion a la base de datos
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Primero testeemos el registro de un nuevo usuario. Hacemos un
  // POST a /api/register con los datos del usuario de prueba
  // y esperamos un código de estado 201 (creado) y un mensaje de éxito
  test('Debe registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuario registrado correctamente');
  });

  // Segundo, hacemos pruebas con el login del usuario recien registrado.
  // Hacemos un POST a /api/login con el email y la contraseña del usuario
  // esperamos un codigo 200 con un token en la respuesta
  test('Debe hacer login y devolver un token', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token; // Guardamos el token para el próximo test
  });

  // Probamos un acceso a un endpoint protegido que me devuelva un 
  // error 401 al no tener el token necesario
  test('No debe permitir acceder a /profile sin token', async () => {
    const res = await request(app)
      .get('/api/profile');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token no proporcionado');
  });

});
