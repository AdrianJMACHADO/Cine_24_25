const request = require("supertest");
const app = require("../index");

describe("🔧 Pruebas sobre la API de Clientes", () => {
  let createdClienteId;

  test("✅ POST /api/cliente → Crear un cliente", async () => {
    const newCliente = {
      nombre: "Cliente Test",
      email: "test@cliente.com",
      telefono: "123456789",
      direccion: "Calle Test 123"
    };

    const res = await request(app)
      .post("/api/cliente")
      .send(newCliente);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensaje", "Cliente registrado");
    expect(res.body.datos).toHaveProperty("idcliente");
    createdClienteId = res.body.datos.idcliente;
  });

  test("✅ GET /api/cliente → Obtener lista de clientes", async () => {
    const res = await request(app).get("/api/cliente");
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Lista de clientes recuperada");
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/cliente/:idcliente → Obtener cliente por ID", async () => {
    const res = await request(app).get(`/api/cliente/${createdClienteId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Cliente encontrado");
    expect(res.body.datos).toHaveProperty("idcliente", createdClienteId);
  });

  test("✅ PUT /api/cliente/:idcliente → Actualizar cliente", async () => {
    const updateData = {
      nombre: "Cliente Actualizado",
      email: "actualizado@cliente.com",
      telefono: "987654321",
      direccion: "Avenida Actualizada 456"
    };

    const res = await request(app)
      .put(`/api/cliente/${createdClienteId}`)
      .send(updateData);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Cliente actualizado");
    expect(res.body.datos).toHaveProperty("nombre", "Cliente Actualizado");
  });

  test("✅ DELETE /api/cliente/:idcliente → Eliminar cliente", async () => {
    const res = await request(app).delete(`/api/cliente/${createdClienteId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Cliente eliminado");
  });
  
  test("❌ POST /api/cliente → Crear cliente con datos incompletos", async () => {
    const incompleteCliente = {
      nombre: "", // Nombre vacío
      email: "invalid-email" // Email inválido
    };

    const res = await request(app)
      .post("/api/cliente")
      .send(incompleteCliente);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("mensaje");
    expect(res.body.mensaje).toMatch(/datos inválidos|campos requeridos/i);
  });
});