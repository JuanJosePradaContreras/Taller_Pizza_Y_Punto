// src/controllers/pedidoController.js
import { crearPedido, obtenerPedidos, obtenerEstadisticasDeVentas } from '../models/pedidoModel.js';
import { asignarRepartidorDisponible } from './repartidorController.js';
import { format } from 'date-fns';
import chalk from 'chalk';

export async function crearNuevoPedido(pedido) {
  const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  // Asignar un repartidor automáticamente
  const repartidor = await asignarRepartidorDisponible();
  if (!repartidor) {
    console.log(chalk.red('\n❌ No se pudo asignar un repartidor.'));
    return;
  }

  const pedidoConDatos = {
    ...pedido,
    repartidor: {
      id: repartidor._id,
      nombre: repartidor.nombre
    },
    fecha
  };

  const nuevo = await crearPedido(pedidoConDatos);
  console.log(chalk.green(`\n🧾 Pedido creado con éxito. Total: $${nuevo.total}`));
  console.log(chalk.cyan(`🛵 Repartidor asignado: ${repartidor.nombre}`));
}

export async function mostrarPedidos() {
  const pedidos = await obtenerPedidos();

  console.log(chalk.blueBright('\n📦 Pedidos Registrados:\n'));
  pedidos.forEach((p, i) => {
    console.log(`${i + 1}. Cliente: ${p.cliente.nombre} | Total: $${p.total}`);
    console.log(`   Pizzas: ${p.pizzas.join(', ')}`);
    console.log(`   Repartidor: ${p.repartidor?.nombre || 'No asignado'}`);
    console.log(`   Fecha: ${p.fecha}\n`);
  });
}

export async function mostrarEstadisticas() {
  const estadisticas = await obtenerEstadisticasDeVentas();

  console.log(chalk.yellowBright('\n📊 Estadísticas de Ventas (por pizza):\n'));
  estadisticas.forEach(stat => {
    console.log(`🍕 ${chalk.green(stat._id)} - Vendidas: ${stat.total}`);
  });
}
