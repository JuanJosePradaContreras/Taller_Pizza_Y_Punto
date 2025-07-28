// Formatearfecha module
// src/utils/formatearFecha.js
import { format } from 'date-fns';

export function formatearFecha(fecha) {
  return format(fecha, 'dd/MM/yyyy HH:mm');
}
