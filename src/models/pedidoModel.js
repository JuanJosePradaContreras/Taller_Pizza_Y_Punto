// src/models/pedidoModel.js
import { conectarDB } from '../db/mongo.js';

const COLECCION = 'pedidos';

export async function crearPedido(pedido) {
  const db = await conectarDB();
  const resultado = await db.collection(COLECCION).insertOne(pedido);
  return { _id: resultado.insertedId, ...pedido };
}

export async function obtenerPedidos() {
  const db = await conectarDB();
  return db.collection(COLECCION).find().toArray();
}

export async function obtenerPedidosPorCliente(clienteNombre) {
  const db = await conectarDB();
  return db.collection(COLECCION).find({ 'cliente.nombre': clienteNombre }).toArray();
}

export async function obtenerEstadisticasDeVentas() {
  const db = await conectarDB();
  return db.collection(COLECCION).aggregate([
    {
      $unwind: '$pizzas'
    },
    {
      $group: {
        _id: '$pizzas',
        total: { $sum: 1 }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]).toArray();
}
