// Pizzamodel module
// src/models/pizzaModel.js
import { conectarDB } from '../db/mongo.js';

const COLECCION = 'pizzas';

export async function obtenerTodasLasPizzas() {
  const db = await conectarDB();
  return db.collection(COLECCION).find().toArray();
}

export async function buscarPizzasPorCategoria(categoria) {
  const db = await conectarDB();
  return db.collection(COLECCION).find({ categoria }).toArray();
}

export async function buscarPizzaPorNombre(nombre) {
  const db = await conectarDB();
  return db.collection(COLECCION).findOne({ nombre });
}

// Opcional: Agregar nueva pizza
export async function agregarPizza(pizza) {
  const db = await conectarDB();
  return db.collection(COLECCION).insertOne(pizza);
}
