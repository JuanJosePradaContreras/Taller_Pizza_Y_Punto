// src/models/clienteModel.js
import { conectarDB } from '../db/mongo.js';

const COLECCION = 'clientes';

export async function obtenerClientes() {
  const db = await conectarDB();
  return db.collection(COLECCION).find().toArray();
}

export async function buscarClientePorTelefono(telefono) {
  const db = await conectarDB();
  return db.collection(COLECCION).findOne({ telefono });
}

export async function crearCliente({ nombre, direccion, telefono }) {
  const db = await conectarDB();
  const nuevo = { nombre, direccion, telefono };
  const resultado = await db.collection(COLECCION).insertOne(nuevo);
  return { _id: resultado.insertedId, ...nuevo };
}
