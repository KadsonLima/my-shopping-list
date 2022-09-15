import supertest from "supertest";
import app from "../src/app";
import { generateItem } from "./factories/itemsFarctory";

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () =>{
    const item = generateItem();
    const result = await supertest(app).post("/items").send(item)

    expect(result.status).toBe(201)
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () =>{
    const item = generateItem();
    await supertest(app).post("/items").send(item)
    const result = await supertest(app).post("/items").send(item)

    expect(result.status).toBe(409)
  });


});

describe('Testa GET /items ', () => {

  it('Deve retornar status 200 e o body no formato de Array', async () =>{

    const result = await supertest(app).get("/items")

    expect(result.status).toBe(200)
    expect.arrayContaining(result.body)
  });
});

describe('Testa GET /items/:id ', () => {

  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () =>{

    const result = await supertest(app).get("/items/1")

    expect(result.status).toBe(200)
    expect.objectContaining(result.body)
  });


  it('Deve retornar status 404 caso não exista um item com esse id', async () =>{

    const result = await supertest(app).get("/items/20")

    expect(result.status).toBe(404)
  });

});
