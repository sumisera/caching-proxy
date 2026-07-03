//creates HTTP server and routes requests
const http = require('http');

function startServer(port, handler) {
    const server = http.createServer((req, res) => {
        handler(req, res)
    });

    server.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}

module.exports = { startServer };