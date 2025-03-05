const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../config/sequelize");
const models = require("../models/init-models")(sequelize);

describe("🔧 Pruebas sobre la API de Entradas (usando clientes)", () => {
  let createdEntradaId;
  let testClienteId;

  // Configuración inicial usando solo clientes
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    
    // Crear cliente que funcionará como proveedor y producto
    const cliente = await models.clientes.create({
      nombre: "Recurso Compartido",
      email: "entradas@test.com",
      telefono: "555555555",
      direccion: "Dirección genérica"
    });
    testClienteId = cliente.idcliente;
  });

  // Limpiar datos después de las pruebas
  afterAll(async () => {
    await models.entradas.destroy({ where: {} });
    await models.clientes.destroy({ where: {} });
    await sequelize.close();
  });

  test("✅ POST /api/entrada → Crear entrada con cliente como proveedor/producto", async () => {
    const entradaMock = {
      fecha: "2023-01-01",
      cantidad: 10,
      precio_unitario: 99.99,
      idproveedor: testClienteId, // Usamos el cliente como proveedor
      idproducto: testClienteId // Usamos el mismo cliente como producto
    };

    const res = await request(app)
      .post("/api/entrada")
      .send(entradaMock);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensaje", "Entrada registrada");
    createdEntradaId = res.body.datos.identrada;
  });

  test("✅ GET /api/entrada → Debe contener la entrada creada", async () => {
    const res = await request(app).get("/api/entrada");
    
    expect(res.statusCode).toBe(200);
    expect(res.body.datos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ identrada: createdEntradaId })
      ])
    );
  });

  test("✅ GET /api/entrada/:identrada → Obtener detalle de entrada", async () => {
    const res = await request(app).get(`/api/entrada/${createdEntradaId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.datos).toMatchObject({
      idproveedor: testClienteId,
      idproducto: testClienteId
    });
  });

  test("✅ PUT /api/entrada/:identrada → Actualizar cantidad", async () => {
    const updateData = { cantidad: 20 };
    
    const res = await request(app)
      .put(`/api/entrada/${createdEntradaId}`)
      .send(updateData);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.datos.cantidad).toBe(20);
  });

  test("✅ DELETE /api/entrada/:identrada → Eliminar entrada", async () => {
    const res = await request(app).delete(`/api/entrada/${createdEntradaId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/eliminada/);
  });
});