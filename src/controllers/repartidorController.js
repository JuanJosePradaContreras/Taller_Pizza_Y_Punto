import {
  obtenerRepartidoresDisponibles,
  asignarRepartidor
} from '../models/repartidorModel.js';

export async function asignarRepartidorDisponible() {
  const disponibles = await obtenerRepartidoresDisponibles();
  console.log('🧪 Repartidores encontrados:', disponibles); // <-- Agrega esto
  if (disponibles.length === 0) {
    console.log('🚫 No hay repartidores disponibles.');
    return null;
  }

  const repartidor = disponibles[0]; // Puedes usar Math.random() para aleatoriedad
  await asignarRepartidor(repartidor._id);

  console.log(`🛵 Repartidor asignado: ${repartidor.nombre}`);
  return repartidor;
}
