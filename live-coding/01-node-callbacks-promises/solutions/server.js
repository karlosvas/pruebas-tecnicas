// 7 - Diseña una API REST utilizando Express que permite a los usuarios crear, leer, modificar, actualizar y eliminar elementos de una lista.
// La lista tendrá objetos que tienen la siguiente forma:
// Haz la solución en el archivo `solutions/server.js` y exporta el `app` y `server` creado.
// Instala Express con`npm install express`.No te preocupes por CORS.

import express from "express";
export const app = express()

app.use(express.json())

const items = [{
    id: 1,
    content: 'Item 1'
}]

app.get('/items', (req, res) => {
    return res.json(items)
})

app.get('/items/:id', (req, res) => {
    const { id } = req.params
    const itemFound = items.find(item => item.id == id)
    if (itemFound) {
        return res.json(itemFound);
    } else {
        return res.status(404).json({ message: "Item not found" });
    }
})

app.post('/items', (req, res) => {
    const { content } = req.body
    const newId = items.length + 1
    const newItem = { id: newId, content }
    items.push(newItem)
    return res.json(newItem)
})

app.put('/items/:id', (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const itemFound = items.find(item => item.id == Number(id))
    if (itemFound) {
        itemFound.content = content;
        return res.json(itemFound);
    } else {
        return res.status(404).json({ message: "Item not found" });
    }
})

app.delete('/items/:id', (req, res) => {
    const { id } = req.params
    const itemIndex = items.findIndex(item => item.id == Number(id))
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        return res.status(200).json();
    } else {
        return res.status(404).json({ message: "Item not found" });
    }
})

const PORT = process.env.PORT ?? 3000
export const server = app.listen(PORT)

// const PORT = process.env.PORT ?? 3000
// export const server = app.listen(PORT, () => {
//     console.log(`Listen on port: http://localhost:${PORT}`)
// })