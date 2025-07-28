// src/models/ingredienteModel.js
import { conectarDB } from '../db/mongo.js';

const COLECCION = 'ingredientes';

export async function obtenerIngredientes() {
  const db = await conectarDB();
  return db.collection(COLECCION).find().toArray();
}

export async function buscarIngredientePorNombre(nombre) {
  const db = await conectarDB();
  return db.collection(COLECCION).findOne({ nombre });
}

export async function disminuirStock(ingredienteNombre, cantidad) {
  const db = await conectarDB();
  return db.collection(COLECCION).updateOne(
    { nombre: ingredienteNombre },
    { $inc: { stock: -cantidad } }
  );
}
