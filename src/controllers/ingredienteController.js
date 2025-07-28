// src/controllers/ingredienteController.js
import chalk from 'chalk';
import { obtenerIngredientes } from '../models/ingredienteModel.js';

export async function mostrarIngredientesDisponibles() {
  const ingredientes = await obtenerIngredientes();

  console.log(chalk.magentaBright('\n🌿 Ingredientes Disponibles:\n'));
  ingredientes.forEach((ing, i) => {
    console.log(`${i + 1}. ${chalk.cyan(ing.nombre)} - Tipo: ${ing.tipo}, Stock: ${ing.stock}`);
  });
}
