import express from "express"
import { configDotenv } from "dotenv"
import logger from "./util/logger.js"
import morgan from "morgan"

configDotenv()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const morganFormat = ":method :url :status :response-time ms"

app.use(
	morgan(morganFormat, {
		stream: {
			write: (message) => {
				const logObject = {
					method: message.split(" ")[0],
					url: message.split(" ")[1],
					status: message.split(" ")[2],
					responseTime: message.split(" ")[3],
				}
				logger.info(JSON.stringify(logObject))
			},
		},
	})
)

let teas = []
let nextId = 1

app.get("/", (req, res) => {
	res.send("Hello World!")
})
app.post("/add_tea", (req, res) => {
	const { name, price } = req.body
	const newTea = { id: nextId++, name, price }
	teas.push(newTea)
	res.status(201).send(newTea)
})
app.get("/teas", (req, res) => {
	res.send(teas)
})
app.get("/teas/:id", (req, res) => {
    logger.info("Getting a tea")
	const id = parseInt(req.params.id)
	const tea = teas.find((t) => t.id === id)
	if (!tea) {
        logger.error(`Tea with id ${id} not found`)
		return res.status(404).send("Tea not found")
	}
	res.status(200).send(tea)
})
app.put("/teas/:id", (req, res) => {
    logger.warn("Updating a tea")
	const id = parseInt(req.params.id)
	const tea = teas.find((t) => t.id === id)
	if (!tea) {
        logger.error(`Tea with id ${id} not found`)
		return res.status(404).send("Tea not found")
	}
	const { name, price } = req.body
	tea.name = name
	tea.price = price
	res.status(200).send(tea)
})
app.delete("/teas/:id", (req, res) => {
    logger.warn("Deleting a tea")
	const id = parseInt(req.params.id)
	const index = teas.findIndex((t) => t.id === id)
	if (index === -1) {
        logger.error(`Tea with id ${id} not found`)
		return res.status(404).send("Tea not found")
	}
	teas.splice(index, 1)
	res.status(204).send("Tea deleted")
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
