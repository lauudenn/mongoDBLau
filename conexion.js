import { MongoClient } from 'mongodb'
import 'dotenv/config'
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const cadenaConexion = process.env.MONGO_URI
const cliente = new MongoClient(cadenaConexion)


let db 

export async function conectarMongo() {
    if (db) {
        return db
    }
 
    await cliente.connect()
    console.log("Conectado a MongoDB")

    db = cliente.db("pizzas")
    return db
}

conectarMongo().catch(error => console.error("Error en conectar a Mongo:", error))