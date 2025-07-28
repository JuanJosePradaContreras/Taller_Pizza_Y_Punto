// src/controllers/clienteController.js
import { buscarClientePorTelefono, crearCliente } from '../models/clienteModel.js';

export async function obtenerOCrearCliente({ nombre, direccion, telefono }) {
  let cliente = await buscarClientePorTelefono(telefono);

  if (!cliente) {
    cliente = await crearCliente({ nombre, direccion, telefono });
    console.log(`✅ Cliente creado: ${cliente.nombre}`);
  } else {
    console.log(`✅ Cliente encontrado: ${cliente.nombre}`);
  }

  return cliente;
}
