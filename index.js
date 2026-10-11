import express from "express";
import { obtenerTodasLasPizzasAsync, obtenerPizzaPorIdAsync, agregarPizzaAsync,actualzarPizzaAsync, borrarPizzaAsync} from './repositorios/pizza.repositorio.js'
import cors from 'cors'

const app = express();
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())
const PORT = 3000; // Puerto en el que escuchará el servidor

//Configuarcion para usar el body en un metod/vebo POST
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()
  return res.status(200).json(pizzas);
});

app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  return res.status(200).json(pizza);

  
});

app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body

  await agregarPizzaAsync(pizza)

  return res.status(201).json({ mensaje: "Pizza agregada correctamente" })
});

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = req.body

  pizza.id = id

  await actualzarPizzaAsync(pizza)

  return res.status(202).json(pizza)
});

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id

  await borrarPizzaAsync(id)

  return res.status(200).json({ mensaje: "Pizza eliminada correctamente" })
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});