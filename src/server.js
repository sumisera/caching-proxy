//creates HTTP server and routes requests
const http = require('http');

function startServer(port, origin, handler) {
    const server = http.createServer((req, res) => {
        handler(req, res, origin)
    });

    server.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}

module.exports = { startServer };