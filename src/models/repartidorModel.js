import { conectarDB } from '../db/mongo.js';

const COLECCION = 'repartidores';

/**
 * Obtiene todos los repartidores que están disponibles.
 */
export async function obtenerRepartidoresDisponibles() {
  const db = await conectarDB();
  return db.collection(COLECCION).find({ disponible: true }).toArray();
}

/**
 * Marca un repartidor como no disponible (ocupado).
 * @param {ObjectId} repartidorId 
 */
export async function asignarRepartidor(repartidorId) {
  const db = await conectarDB();
  return db.collection(COLECCION).updateOne(
    { _id: repartidorId },
    { $set: { disponible: false } }
  );
}

/**
 * Marca un repartidor como disponible nuevamente.
 * @param {ObjectId} repartidorId 
 */
export async function liberarRepartidor(repartidorId) {
  const db = await conectarDB();
  return db.collection(COLECCION).updateOne(
    { _id: repartidorId },
    { $set: { disponible: true } }
  );
}
