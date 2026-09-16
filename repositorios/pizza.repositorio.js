//esta es la capa donde persisten los datos, en este caso es un arreglo de pizzas
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let pizzas = [{id: 1, nombre: "Hawaiina", descripcion: "Jamon y pinia"}];
/**
 * Regresa una lista de las pizza
 * @returns []
 */
export async function obtenerPizzasAsync() {
    await sleep(2000); 
    return pizzas
}
/**
 * Regresa una pizza por su id
 * @param {*} id 
 */
export async function obtenerPizzaPorIdAsync(id) {
    await sleep(1000);
    const pizza = pizzas.find(x => x.id == id);
    return pizza
}
export async function agregarPizzasAsync(pizza) {
    await sleep(1000);
    pizzas.push(pizza);
    return pizzas.length
}
export async function actualizarPizzasAsync(id, pizzaActualizada) {
    await sleep(1000)
    const index = pizzas.findIndex(x => x.id == id)
    if (index == -1)
    return undefined
    pizzas[index].nombre = pizza.nombre
    pizzas[index].descripcion = pizza.descripcion
    return pizzas[index]
    return "pizza actualizada"
}
export async function EliminarPizzasAsync(id) {
    await sleep(1000)
    const index = pizzas.findIndex(x => x.id == id)
    pizzas.splice(index)
    return "pizza borrada"
}

