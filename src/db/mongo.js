// src/db/mongo.js
import { MongoClient } from 'mongodb';

// Conexión directa sin .env
const uri = 'mongodb://127.0.0.1:27017/pizza_y_punto';
const client = new MongoClient(uri);

export async function conectarDB() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');
    return client.db(); // Retorna la base de datos
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

export async function desconectarDB() {
  await client.close();
  console.log('🔌 Desconectado de MongoDB');
}
