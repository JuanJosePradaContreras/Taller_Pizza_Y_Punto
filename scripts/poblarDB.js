// scripts/poblarDB.js
import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';

// ⛔️ Aquí pones directamente tu URI
const uri = 'mongodb://127.0.0.1:27017/pizza_y_punto';
const client = new MongoClient(uri);

async function poblarDB() {
  try {
    await client.connect();
    const db = client.db();

    // Ingredientes base
    const ingredientes = [
      { nombre: 'Queso', stock: 100 },
      { nombre: 'Jamón', stock: 80 },
      { nombre: 'Pepperoni', stock: 90 },
      { nombre: 'Champiñones', stock: 70 },
      { nombre: 'Piña', stock: 50 },
      { nombre: 'Tomate', stock: 60 },
      { nombre: 'Pollo', stock: 75 },
    ];
    await db.collection('ingredientes').deleteMany({});
    await db.collection('ingredientes').insertMany(ingredientes);
    console.log('🥫 Ingredientes insertados.');

    // Pizzas base
    const pizzas = [
      { nombre: 'Hawaiana', precio: 25000, ingredientes: ['Queso', 'Jamón', 'Piña'] },
      { nombre: 'Pepperoni', precio: 23000, ingredientes: ['Queso', 'Pepperoni'] },
      { nombre: 'Pollo con Champiñones', precio: 26000, ingredientes: ['Queso', 'Pollo', 'Champiñones'] },
      { nombre: 'Vegetariana', precio: 22000, ingredientes: ['Queso', 'Champiñones', 'Tomate'] },
    ];
    await db.collection('pizzas').deleteMany({});
    await db.collection('pizzas').insertMany(pizzas);
    console.log('🍕 Pizzas insertadas.');

    // Clientes de prueba
    const clientes = Array.from({ length: 5 }, () => ({
      nombre: faker.person.fullName(),
      direccion: faker.location.streetAddress(),
      telefono: faker.phone.number(),
    }));
    await db.collection('clientes').deleteMany({});
    await db.collection('clientes').insertMany(clientes);
    console.log('👤 Clientes insertados.');

    // Repartidores de prueba
    const repartidores = Array.from({ length: 3 }, () => ({
      nombre: faker.person.fullName(),
      disponible: true,
    }));
    await db.collection('repartidores').deleteMany({});
    await db.collection('repartidores').insertMany(repartidores);
    console.log('🛵 Repartidores insertados.');

  } catch (error) {
    console.error('❌ Error al poblar la DB:', error);
  } finally {
    await client.close();
  }
}

poblarDB();
