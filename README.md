# 🍕 Pizza y Punto - Sistema de Gestión de Pedidos (CLI con Node.js y MongoDB)

**Pizza y Punto** es una aplicación de consola (CLI) desarrollada con **Node.js** que simula el flujo completo de pedidos de una pizzería, gestionando clientes, pizzas, ingredientes, repartidores y pedidos. Utiliza **MongoDB** como base de datos para almacenar toda la información y permite realizar operaciones CRUD, asignación de repartidores y consultas avanzadas con Aggregation.



## 📦 Descripción del sistema

Este sistema permite:

- Registrar nuevos pedidos de pizza con selección de ingredientes.
- Asignar automáticamente un repartidor disponible.
- Marcar pedidos como entregados y liberar al repartidor.
- Ver reportes y análisis usando Aggregation (ventas por pizza, reparto por repartidor, etc).
- Interactuar con la base de datos MongoDB desde la consola.


## ▶️ Instrucciones para ejecutar la aplicación desde consola

### 1. Clonar el repositorio

git clone https://github.com/tuusuario/pizza-y-punto.git
cd pizza-y-punto

## 2. Instalar dependencias

npm install

## 3. Configurar MongoDB

Asegúrate de tener una instancia local o remota de MongoDB corriendo. Por defecto, el sistema usa:

mongodb://127.0.0.1:27017

y la base de datos: pizza_y_punto
## 4. Ejecutar el programa

node index.js

## 📚 Comandos disponibles

El menú principal en la consola te permitirá ejecutar estas acciones:

1️⃣ Registrar nuevo pedido	Crea un pedido, selecciona cliente, pizza, ingredientes y asigna un repartidor disponible.
2️⃣ Ver pedidos activos	Muestra los pedidos actuales en curso (sin entregar).
3️⃣ Marcar pedido como entregado	Cambia el estado del pedido y libera al repartidor.
4️⃣ Reportes y análisis	Consultas avanzadas con Aggregation.
5️⃣ Salir	Finaliza el programa.
🔄 Transacciones y estructura de flujo

Cuando se registra un nuevo pedido, se ejecuta la siguiente secuencia de acciones:

##    Se selecciona el cliente.

##    Se elige la pizza (puede incluir ingredientes adicionales).

##    Se crea el pedido con los siguientes datos:

{
  "clienteId": ObjectId,
  "pizzaId": ObjectId,
  "ingredientesExtras": [ObjectId, ...],
  "repartidorId": ObjectId,
  "estado": "en camino",
  "fecha": ISODate
}

    Se asigna un repartidor disponible (disponible: true → false).

    Cuando se entrega, el pedido cambia a estado: "entregado" y el repartidor vuelve a estar disponible.

Todas estas operaciones afectan directamente las colecciones en MongoDB (clientes, pizzas, ingredientes, repartidores, pedidos).

## 📊 Ejemplos de consultas con Aggregation

## 🍕 Ventas por tipo de pizza

db.pedidos.aggregate([
  {
    $group: {
      _id: "$pizzaId",
      totalPedidos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "pizzas",
      localField: "_id",
      foreignField: "_id",
      as: "pizza"
    }
  },
  {
    $unwind: "$pizza"
  },
  {
    $project: {
      _id: 0,
      pizza: "$pizza.nombre",
      totalPedidos: 1
    }
  }
])

## 🛵 Repartidores con más entregas

db.pedidos.aggregate([
  {
    $match: { estado: "entregado" }
  },
  {
    $group: {
      _id: "$repartidorId",
      entregas: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "repartidores",
      localField: "_id",
      foreignField: "_id",
      as: "repartidor"
    }
  },
  {
    $unwind: "$repartidor"
  },
  {
    $project: {
      nombre: "$repartidor.nombre",
      entregas: 1
    }
  },
  {
    $sort: { entregas: -1 }
  }
])

## 🗂️ Estructura del proyecto

pizza-y-punto/
├── src/
│   ├── index.js               # Punto de entrada principal
│   ├── db/
│   │   └── mongo.js           # Conexión a MongoDB
│   ├── models/
│   │   ├── clienteModel.js
│   │   ├── pizzaModel.js
│   │   ├── ingredienteModel.js
│   │   ├── pedidoModel.js
│   │   └── repartidorModel.js
│   ├── controllers/
│   │   └── repartidorController.js
│   └── utils/
│       └── menu.js            # Menú CLI con Inquirer
└── package.json

## 👨‍💻 Requisitos

    Node.js v18+

    MongoDB (local o Atlas)

##   Dependencias:

        mongodb

        inquirer

        chalk

## Instaladas con:

npm install

✅ Créditos

Desarrollado por Breyner Pinto, Juan Jose Prada y Jersson Fuentes Parra .



