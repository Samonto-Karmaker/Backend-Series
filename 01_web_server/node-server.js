const http = require("http")

const url = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.end("Hello World\n")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain")
        res.end("Not Found\n")
    }
})

server.listen(port, url, () => {
    console.log(`Server running at http://${url}:${port}/`)
})