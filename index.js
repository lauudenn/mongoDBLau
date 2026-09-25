import express from "express";
import cors from "cors";
import { obtenerPizzasAsync, obtenerPizzaPorIdAsync, agregarPizzasAsync, actualizarPizzasAsync, EliminarPizzasAsync } from "./repositorios/pizza.repositorio.js";

const app = express();
app.use(cors())
const PORT = 3000;
//configuracion para ver el body en un metodo post
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/v1/pizzas", async (req, res) => {
    const pizzas = await obtenerPizzasAsync();
    return res.status(200).json(pizzas);
})
app.get("/api/v1/pizzas/:id", async (req, res) => {
    const id = req.params.id;
    const pizza = await obtenerPizzaPorIdAsync(id);
    return res.status(200).json(pizza);
})
app.post("/api/v1/pizzas", async (req, res) => {
     const pizza = req.body; 
     const id = await agregarPizzasAsync(pizza); 
     const idDto = {id: id, fecha: new Date()};
     return res.status(201).json(idDto); 
})
app.put("/api/v1/pizzas/:id", async (req, res) => 
{
    const id = req.params.id;
    const pizza = await obtenerPizzaPorIdAsync(id);
    if (pizza===undefined) {
        const mensaje = { mensaje: "Pizza no encontrada" }
        return res.status(404).json(mensaje);
    }
    const pizzaActualizada = req.body;
    await actualizarPizzasAsync(id, pizzaActualizada);
    const mensaje = { mensaje: "Pizza actualizada" };
    return res.status(202).json(mensaje);
})

app.delete("/api/v1/pizzas/:id", async (req, res) => { 
    const id = req.params.id; 
    await EliminarPizzasAsync(id); 
    const mensaje = { mensaje: "Pizza eliminada" };
    return res.status(200).json(mensaje) 
})

//iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})