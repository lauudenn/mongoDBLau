import { conectarMongo } from '../conexion.js'

/**
 * Obtiene todos los documentos de la colección pizzas.
 * @returns {Promise<Array>} Arreglo con todas las pizzas encontradas en la base de datos.
 */
export async function obtenerTodasLasPizzasAsync() {
    // Conectamos a la base de datos
    const db = await conectarMongo();
    
    // Usamos find() para obtener el cursor y toArray() para convertir los documentos a un arreglo
    const pizzas = await db.collection("pizzas").find().toArray();
    
    return pizzas;
}

/**
 * Busca una pizza específica por su campo 'id'.
 * Convierte el ID recibido a número para la comparación.
 * @param {string|number} id Identificador de la pizza que se desea buscar.
 * @returns {Promise<Object|null>} Pizza encontrada o null si el documento no existe.
 */
export async function obtenerPizzaPorIdAsync(id) {
    const db = await conectarMongo();
    
    // Convertimos el id a número para que coincida con el tipo de dato almacenado
    const idNumerico = Number(id);
    
    // Usamos findOne para obtener un solo documento cuyo campo 'id' coincida
    const pizza = await db.collection("pizzas").findOne({ id: idNumerico });
    
    return pizza;
}

/**
 * Inserta una nueva pizza en la colección 'pizzas'.
 * @param {Object} pizza Objeto con los datos de la pizza 
 * @returns {Promise<Object>} Resultado de la inserción de mongo
 */
export async function agregarPizzaAsync(pizza) {
    const db = await conectarMongo();
    
    // Insertamos el documento completo recibido en el body de Express
    const resultado = await db.collection("pizzas").insertOne(pizza);
    
    return resultado;
}

/**
 * Actualiza el nombre y descripción de una pizza existente buscando por su campo 'id'.
 * No crea otra pizza si el ID no existe.
 * @param {Object} pizza Objeto con el id de la pizza a actualizar y los nuevos datos.
 * @returns {Promise<Object>} Resultado de la actualización 
 */
export async function actualzarPizzaAsync(pizza) {
    const db = await conectarMongo();
    
    // Convertimos el id recibido a número
    const idNumerico = Number(pizza.id);

    // Actualizamos utilizando updateOne y el operador $set para modificar solo los campos específicos
    const resultado = await db.collection("pizzas").updateOne(
        { id: idNumerico }, 
        { $set: { nombre: pizza.nombre, descripcion: pizza.descripcion } }
    );
    
    return resultado;
}

/**
 * Elimina una pizza de la colección utilizando su campo 'id'.
 * @param {string|number} id Identificador de la pizza que se desea eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación 
 */
export async function borrarPizzaAsync(id) {
    const db = await conectarMongo();
    
    // Convertimos el id a número
    const idNumerico = Number(id);

    // Eliminamos el documento que coincida exactamente con ese id
    const resultado = await db.collection("pizzas").deleteOne({ id: idNumerico });
    
    return resultado;
}