import { MongoClient, ObjectId } from "mongodb";

// Cadena de conexión y configuración de BD/Colección
const uri = "mongodb://root:191291@localhost:27017/";
const client = new MongoClient(uri);

const DB_NAME = "pizzeriadb"; // Reemplaza con el nombre de tu base de datos
const COLLECTION_NAME = "pizzas";

/**
 * Retorna la referencia a la colección de pizzas asegurando la conexión
 */
async function getCollection() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db(DB_NAME).collection(COLLECTION_NAME);
}

/**
 * Regresa una lista de las pizzas
 * @returns {Promise<Array>}
 */
export async function obtenerPizzasAsync() {
    const collection = await getCollection();
    const pizzas = await collection.find({}).toArray();
    return pizzas;
}

/**
 * Regresa una pizza por su id o undefined si no existe
 * @param {string} id 
 * @returns {Promise<Object|undefined>} 
 */
export async function obtenerPizzaPorIdAsync(id) {
    if (!ObjectId.isValid(id)) return undefined;

    const collection = await getCollection();
    const pizza = await collection.findOne({ _id: new ObjectId(id) });
    return pizza || undefined;
}

/**
 * Agrega una nueva pizza a la lista 
 * @param {Object} pizza 
 * @returns {Promise<string>} Id del elemento insertado
 */
export async function agregarPizzasAsync(pizza) {
    const collection = await getCollection();
    const resultado = await collection.insertOne(pizza);
    return resultado.insertedId.toString();
}

/**
 * Actualiza una pizza existente 
 * @param {string} id 
 * @param {Object} pizza 
 * @returns {Promise<Object|undefined>}
 */
export async function actualizarPizzasAsync(id, pizza) {
    if (!ObjectId.isValid(id)) return undefined;

    const collection = await getCollection();
    
    // Evita modificar el _id internamente si viene dentro del objeto
    const { _id, ...datosActualizados } = pizza;

    const resultado = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: datosActualizados },
        { returnDocument: "after" }
    );

    return resultado || undefined;
}

/**
 * Elimina una pizza existente
 * @param {string} id 
 * @returns {Promise<boolean>}
 */
export async function EliminarPizzasAsync(id) {
    if (!ObjectId.isValid(id)) return false;

    const collection = await getCollection();
    const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
    return resultado.deletedCount > 0;
}
