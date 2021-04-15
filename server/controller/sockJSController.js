const sockjs = require("sockjs");

const sockjs_echo = sockjs.createServer();
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

module.exports = sockjs_echo;