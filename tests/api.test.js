const { expect } = require("chai");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

describe("ShipNow API", function () {
  it("expone health check sin datos sensibles", async function () {
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.include.keys("api", "environment", "uptime", "timestamp");
    expect(response.body.payload).to.not.have.property("databaseUri");
  });

  it("expone Swagger UI", async function () {
    await request(app).get("/api/docs/").expect(200).expect("Content-Type", /html/);
  });

  it("devuelve errores 404 con el formato general", async function () {
    const response = await request(app).get("/ruta-inexistente").expect(404);
    expect(response.body).to.deep.include({ status: "error", code: "ROUTE_NOT_FOUND" });
  });

  it("valida cantidades inválidas en mocks", async function () {
    const response = await request(app).get("/api/mocks/users?quantity=0").expect(400);
    expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
  });

  it("inserta datos mock consistentes", async function () {
    const response = await request(app).post("/api/mocks/seed").expect(201);
    expect(response.body.payload.users).to.not.be.empty;
    expect(response.body.payload.orders).to.not.be.empty;
    expect(response.body.payload.deliveries).to.not.be.empty;
    expect(response.body.payload.couriers).to.not.be.empty;
  });

  it("crea y pagina usuarios", async function () {
    const created = await request(app).post("/api/users").send({
      first_name: "Ana", last_name: "Pérez", email: "ana@example.com", role: "user",
    }).expect(201);
    expect(created.body.payload.email).to.equal("ana@example.com");
    const list = await request(app).get("/api/users?page=1&limit=10").expect(200);
    expect(list.body.payload).to.have.length(1);
    expect(list.body.pagination.total).to.equal(1);
  });

  it("crea, consulta y valida estados de pedidos", async function () {
    const created = await request(app).post("/api/orders").send({
      customerName: "Cliente", address: "Calle 123", weight: 2,
      items: [{ name: "Caja", quantity: 1, price: 10 }],
    }).expect(201);
    const id = created.body.payload._id;
    await request(app).get(`/api/orders/${id}`).expect(200);
    const invalid = await request(app).patch(`/api/orders/${id}/status`).send({ status: "unknown" }).expect(400);
    expect(invalid.body.code).to.equal("INVALID_ORDER_STATUS");
  });

  it("carga un documento de usuario y guarda sus metadatos", async function () {
    const user = await request(app).post("/api/users").send({
      first_name: "Luz", last_name: "Díaz", email: "luz@example.com",
    }).expect(201);
    const response = await request(app)
      .post(`/api/users/${user.body.payload._id}/documents`)
      .field("documentType", "identity")
      .attach("document", Buffer.from("archivo de prueba"), { filename: "documento.pdf", contentType: "application/pdf" })
      .expect(201);
    expect(response.body.payload.documents).to.have.length(1);
    expect(response.body.payload.documents[0]).to.include.keys("originalName", "generatedName", "path", "mimeType", "size", "uploadedAt");
  });

  it("rechaza una carga sin archivo y un tipo documental inválido", async function () {
    const user = await request(app).post("/api/users").send({
      first_name: "Sol", last_name: "Ruiz", email: "sol@example.com",
    }).expect(201);
    const id = user.body.payload._id;
    expect((await request(app).post(`/api/users/${id}/documents`).field("documentType", "identity").expect(400)).body.code).to.equal("FILE_REQUIRED");
    expect((await request(app).post(`/api/users/${id}/documents`).field("documentType", "passport").attach("document", Buffer.from("x"), {filename:"x.pdf",contentType:"application/pdf"}).expect(400)).body.code).to.equal("INVALID_DOCUMENT_TYPE");
  });

  it("rechaza un comprobante cuando la entrega no existe", async function () {
    const id = new mongoose.Types.ObjectId().toString();
    const response = await request(app).post(`/api/deliveries/${id}/proof`)
      .attach("proof", Buffer.from("proof"), {filename:"proof.png",contentType:"image/png"})
      .expect(404);
    expect(response.body.code).to.equal("DELIVERY_NOT_FOUND");
  });

  it("crea una entrega y asocia un comprobante", async function () {
    const order = await request(app).post("/api/orders").send({
      customerName: "Cliente", address: "Calle 9", weight: 1,
    }).expect(201);
    const courier = await request(app).post("/api/couriers").send({
      name: "Repartidor Uno", zone: "Centro",
    }).expect(201);
    const delivery = await request(app).post("/api/deliveries").send({
      orderId: order.body.payload._id,
      courierId: courier.body.payload._id,
    }).expect(201);
    const proof = await request(app).post(`/api/deliveries/${delivery.body.payload._id}/proof`)
      .attach("proof", Buffer.from("proof"), {filename:"proof.png",contentType:"image/png"})
      .expect(201);
    expect(proof.body.payload.proofs).to.have.length(1);
  });
});
