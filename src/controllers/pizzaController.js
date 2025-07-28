// Pizzacontroller module
// src/controllers/pizzaController.js
import chalk from 'chalk';
import { obtenerTodasLasPizzas, buscarPizzasPorCategoria } from '../models/pizzaModel.js';

export async function mostrarPizzas() {
  const pizzas = await obtenerTodasLasPizzas();

  console.log(chalk.blueBright('\n🍕 Lista de Pizzas Disponibles:\n'));

  pizzas.forEach((pizza, index) => {
    console.log(`${index + 1}. ${chalk.green(pizza.nombre)} - $${pizza.precio}`);
    console.log(`   Categoría: ${pizza.categoria}`);
    console.log(`   Ingredientes: ${pizza.ingredientes.join(', ')}`);
    console.log('');
  });
}

export async function mostrarPizzasPorCategoria(categoria) {
  const pizzas = await buscarPizzasPorCategoria(categoria);

  if (pizzas.length === 0) {
    console.log(chalk.red(`\n❌ No se encontraron pizzas en la categoría: ${categoria}`));
    return;
  }

  console.log(chalk.yellowBright(`\n🍕 Pizzas en la categoría "${categoria}":\n`));
  pizzas.forEach(pizza => {
    console.log(`- ${chalk.green(pizza.nombre)}: $${pizza.precio}`);
  });
}
