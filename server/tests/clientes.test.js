// Pruebas de integración de la API de clientes.
// Requiere el servidor corriendo: npm run dev
const { test } = require('node:test');
const assert = require('node:assert');

const URL = process.env.API_URL || 'http://localhost:3001/api/clientes';
const sufijo = Date.now();
let idCreado;

test('GET /api/clientes devuelve un array', async () => {
  const res = await fetch(URL);
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(await res.json()));
});

test('POST /api/clientes crea un cliente y no devuelve la contraseña', async () => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: { firstname: 'Test', lastname: 'Automatico' },
      username: `test${sufijo}`,
      email: `test${sufijo}@prueba.com`,
      password: 'clave12345'
    })
  });
  assert.strictEqual(res.status, 201);
  const cliente = await res.json();
  assert.ok(cliente.id);
  assert.strictEqual(cliente.password, undefined);
  idCreado = cliente.id;
});

test('GET /api/clientes/:id devuelve el cliente creado', async () => {
  const res = await fetch(`${URL}/${idCreado}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual((await res.json()).email, `test${sufijo}@prueba.com`);
});

test('POST con email repetido devuelve 400', async () => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: { firstname: 'Otro', lastname: 'Test' },
      username: `otro${sufijo}`,
      email: `test${sufijo}@prueba.com`,
      password: 'clave12345'
    })
  });
  assert.strictEqual(res.status, 400);
});

test('DELETE /api/clientes/:id da de baja al cliente', async () => {
  const res = await fetch(`${URL}/${idCreado}`, { method: 'DELETE' });
  assert.strictEqual(res.status, 200);
  const res2 = await fetch(`${URL}/${idCreado}`);
  assert.strictEqual(res2.status, 404);
});

test('GET con id inválido devuelve 404', async () => {
  const res = await fetch(`${URL}/id-que-no-existe`);
  assert.strictEqual(res.status, 404);
});