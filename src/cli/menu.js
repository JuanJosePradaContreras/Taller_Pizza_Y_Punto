    // Menu module
// src/cli/menu.js
import inquirer from 'inquirer';
import chalk from 'chalk';
import { mostrarPizzas } from '../controllers/pizzaController.js';
import { mostrarIngredientesDisponibles } from '../controllers/ingredienteController.js';
import { mostrarPedidos, mostrarEstadisticas, crearNuevoPedido } from '../controllers/pedidoController.js';
import { obtenerOCrearCliente } from '../controllers/clienteController.js';
import { asignarRepartidorDisponible } from '../controllers/repartidorController.js';

import { buscarPizzaPorNombre } from '../models/pizzaModel.js';
import { disminuirStock } from '../models/ingredienteModel.js';

async function mainMenu() {
  console.clear();
  console.log(chalk.bgRed.white.bold('\n🍕 Bienvenido a Pizza y Punto 🍕\n'));

  const opciones = [
    '1. Ver lista de pizzas',
    '2. Ver ingredientes disponibles',
    '3. Crear nuevo pedido',
    '4. Ver pedidos existentes',
    '5. Ver estadísticas de ventas',
    '0. Salir',
  ];

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: opciones,
    },
  ]);

  switch (opcion[0]) {
    case '1':
      await mostrarPizzas();
      break;
    case '2':
      await mostrarIngredientesDisponibles();
      break;
    case '3':
      await flujoCrearPedido();
      break;
    case '4':
      await mostrarPedidos();
      break;
    case '5':
      await mostrarEstadisticas();
      break;
    case '0':
      console.log(chalk.green('\n👋 Gracias por usar Pizza y Punto. ¡Hasta luego!\n'));
      process.exit(0);
    default:
      console.log(chalk.red('❌ Opción inválida'));
  }

  await pausar();
  await mainMenu();
}

async function pausar() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'pausa',
      message: chalk.yellow('\nPresiona ENTER para continuar...'),
    },
  ]);
}

async function flujoCrearPedido() {
  // Solicitar datos del cliente
  const clienteRes = await inquirer.prompt([
    { name: 'nombre', message: 'Nombre del cliente:' },
    { name: 'direccion', message: 'Dirección:' },
    { name: 'telefono', message: 'Teléfono:' },
  ]);
  const cliente = await obtenerOCrearCliente(clienteRes);

  // Seleccionar pizzas
  const { pizzasSeleccionadas } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pizzasSeleccionadas',
      message: '¿Qué pizzas desea? (Separadas por coma):',
    },
  ]);

  const nombres = pizzasSeleccionadas.split(',').map(p => p.trim());
  const pizzas = [];
  let total = 0;

  for (let nombre of nombres) {
    const pizza = await buscarPizzaPorNombre(nombre);
    if (pizza) {
      pizzas.push(pizza.nombre);
      total += pizza.precio;

      // Disminuir stock de ingredientes
      for (let ing of pizza.ingredientes) {
        await disminuirStock(ing, 1);
      }
    } else {
      console.log(chalk.red(`⚠️ La pizza "${nombre}" no existe.`));
    }
  }

  if (pizzas.length === 0) {
    console.log(chalk.red('❌ No se seleccionaron pizzas válidas.'));
    return;
  }

  // Asignar repartidor
  const repartidor = await asignarRepartidorDisponible();

  // Crear pedido
  await crearNuevoPedido({
    cliente,
    pizzas,
    total,
    repartidor,
  });
}

mainMenu();
