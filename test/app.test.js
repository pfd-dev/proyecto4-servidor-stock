// // tests/usuario.test.js
// import request from 'supertest';
// import express from 'express';
// import * as usuarioController from '../src/routes/usuarios.route.js';
// import { usuarioModel } from '../src/models/usuario.model.js';
// import bcrypt from 'bcrypt';

// // jest.mock('../src/models/usuario.model.js');

// const app = express();
// app.use(express.json());


// describe("gran test", () => {
//     describe('GET /usuarios', () => {
//         test('debería devolver todos los usuarios', async () => {
//             const mockUsuarios = [{ _id: '1', nombre: 'Juan' }];
//             usuarioModel.find.mockResolvedValue(mockUsuarios);

//             const res = await request(app).get('/usuarios');

//             expect(res.statusCode).toBe(200);
//             expect(res.body).toEqual(mockUsuarios);
//         });

//         test('debería manejar errores y devolver 500', async () => {
//             usuarioModel.find.mockRejectedValue(new Error('DB error'));

//             const res = await request(app).get('/usuarios');

//             expect(res.statusCode).toBe(500);
//             expect(res.text).toBe('Error interno');
//         });
//     });

//     // describe('GET /usuarios', () => {
//     //     test('debería devolver todos los usuarios', async () => {
//     //         const mockUsuarios = [{ _id: '1', nombre: 'Juan' }];
//     //         usuarioModel.find.mockResolvedValue(mockUsuarios);

//     //         const res = await request(app).get('/usuarios');

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body).toEqual(mockUsuarios);
//     //     });

//     //     test('debería manejar errores y devolver 500', async () => {
//     //         usuarioModel.find.mockRejectedValue(new Error('DB error'));

//     //         const res = await request(app).get('/usuarios');

//     //         expect(res.statusCode).toBe(500);
//     //         expect(res.text).toBe('Error interno');
//     //     });
//     // });


//     // describe('GET /usuarios/:id', () => {
//     //     test('debería devolver el usuario por ID', async () => {
//     //         const mockUsuario = { _id: '1', nombre: 'Ana' };
//     //         usuarioModel.findById.mockResolvedValue(mockUsuario);

//     //         const res = await request(app).get('/usuarios/1');

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body).toEqual(mockUsuario);
//     //     });

//     //     test('debería devolver 404 si no se encuentra', async () => {
//     //         usuarioModel.findById.mockResolvedValue(null);

//     //         const res = await request(app).get('/usuarios/1');

//     //         expect(res.statusCode).toBe(404);
//     //         expect(res.text).toBe('Usuario no encontrado');
//     //     });

//     //     test('debería manejar errores y devolver 500', async () => {
//     //         usuarioModel.findById.mockRejectedValue(new Error('DB error'));

//     //         const res = await request(app).get('/usuarios/1');

//     //         expect(res.statusCode).toBe(500);
//     //         expect(res.text).toBe('Error interno');
//     //     });
//     // });


//     // describe('POST /usuarios', () => {
//     //     test('debería crear un nuevo usuario', async () => {
//     //         const data = { nombre: 'Pedro', email: 'pedro@mail.com', password: '123' };
//     //         const guardado = { _id: 'abc', ...data };

//     //         usuarioModel.mockImplementation(() => ({
//     //             save: jest.fn().mockResolvedValue(guardado)
//     //         }));

//     //         const res = await request(app).post('/usuarios').send(data);

//     //         expect(res.statusCode).toBe(201);
//     //         expect(res.body.email).toBe('pedro@mail.com');
//     //     });

//     //     test('debería devolver 400 si hay error', async () => {
//     //         usuarioModel.mockImplementation(() => ({
//     //             save: jest.fn().mockRejectedValue(new Error('Error al guardar'))
//     //         }));

//     //         const res = await request(app).post('/usuarios').send({
//     //             nombre: 'Error',
//     //             password: '123'
//     //         });

//     //         expect(res.statusCode).toBe(400);
//     //         expect(res.text).toBe('Datos inválidos');
//     //     });
//     // });


//     // describe('PUT /usuarios/:id', () => {
//     //     test('debería actualizar un usuario', async () => {
//     //         const actualizado = { _id: '1', nombre: 'Actualizado' };
//     //         usuarioModel.findByIdAndUpdate.mockResolvedValue(actualizado);

//     //         const res = await request(app).put('/usuarios/1').send({ nombre: 'Actualizado' });

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body.nombre).toBe('Actualizado');
//     //     });

//     //     test('debería devolver 404 si no se encuentra', async () => {
//     //         usuarioModel.findByIdAndUpdate.mockResolvedValue(null);

//     //         const res = await request(app).put('/usuarios/1').send({ nombre: 'Nada' });

//     //         expect(res.statusCode).toBe(404);
//     //         expect(res.text).toBe('Usuario no encontrado');
//     //     });

//     //     test('debería devolver 400 si hay error', async () => {
//     //         usuarioModel.findByIdAndUpdate.mockRejectedValue(new Error('Error de update'));

//     //         const res = await request(app).put('/usuarios/1').send({ nombre: 'X' });

//     //         expect(res.statusCode).toBe(400);
//     //         expect(res.text).toBe('Datos inválidos');
//     //     });
//     // });


//     // describe('DELETE /usuarios/:id', () => {
//     //     test('debería eliminar un usuario', async () => {
//     //         const eliminado = { _id: '1', nombre: 'Borrado' };
//     //         usuarioModel.findByIdAndDelete.mockResolvedValue(eliminado);

//     //         const res = await request(app).delete('/usuarios/1');

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body.nombre).toBe('Borrado');
//     //     });

//     //     test('debería devolver 404 si no se encuentra', async () => {
//     //         usuarioModel.findByIdAndDelete.mockResolvedValue(null);

//     //         const res = await request(app).delete('/usuarios/1');

//     //         expect(res.statusCode).toBe(404);
//     //         expect(res.text).toBe('Usuario no encontrado');
//     //     });

//     //     test('debería manejar errores y devolver 500', async () => {
//     //         usuarioModel.findByIdAndDelete.mockRejectedValue(new Error('Error'));

//     //         const res = await request(app).delete('/usuarios/1');

//     //         expect(res.statusCode).toBe(500);
//     //         expect(res.text).toBe('Error interno');
//     //     });
//     // });


//     // describe('POST /login', () => {
//     //     test('debería iniciar sesión con credenciales válidas', async () => {
//     //         const user = {
//     //             _id: '1',
//     //             email: 'test@mail.com',
//     //             password: await bcrypt.hash('123', 10)
//     //         };

//     //         usuarioModel.findOne.mockResolvedValue(user);

//     //         const res = await request(app)
//     //             .post('/login')
//     //             .send({ email: 'test@mail.com', password: '123' });

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body.mensaje).toBe('Sesión iniciada');
//     //     });

//     //     test('debería rechazar si usuario no existe', async () => {
//     //         usuarioModel.findOne.mockResolvedValue(null);

//     //         const res = await request(app)
//     //             .post('/login')
//     //             .send({ email: 'no@mail.com', password: '123' });

//     //         expect(res.statusCode).toBe(401);
//     //         expect(res.text).toBe('Credenciales inválidas');
//     //     });

//     //     test('debería rechazar si la contraseña es incorrecta', async () => {
//     //         const user = {
//     //             _id: '1',
//     //             email: 'test@mail.com',
//     //             password: await bcrypt.hash('correcta', 10)
//     //         };

//     //         usuarioModel.findOne.mockResolvedValue(user);

//     //         const res = await request(app)
//     //             .post('/login')
//     //             .send({ email: 'test@mail.com', password: 'incorrecta' });

//     //         expect(res.statusCode).toBe(401);
//     //         expect(res.text).toBe('Credenciales inválidas');
//     //     });
//     // });


//     // describe('POST /logout', () => {
//     //     test('debería limpiar la cookie y cerrar sesión', async () => {
//     //         const res = await request(app).post('/logout');

//     //         expect(res.statusCode).toBe(200);
//     //         expect(res.body.mensaje).toBe('Sesión cerrada');
//     //     });
//     // });
// });