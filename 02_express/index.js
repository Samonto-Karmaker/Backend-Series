import express from "express"
import { configDotenv } from "dotenv"

configDotenv()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

let teas = []
let nextId = 1

app.get("/", (req, res) => {
	res.send("Hello World!")
})
app.post("/add_tea", (req, res) => {
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teas.push(newTea)
    res.status(201).send(newTea)
})
app.get("/teas", (req, res) => {
    res.send(teas)
})
app.get("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const tea = teas.find(t => t.id === id)
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})
app.put("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const tea = teas.find(t => t.id === id)
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})
app.delete("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = teas.findIndex(t => t.id === id)
    if (index === -1) {
        return res.status(404).send("Tea not found")
    }
    teas.splice(index, 1)
    res.status(204).send("Tea deleted")
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
