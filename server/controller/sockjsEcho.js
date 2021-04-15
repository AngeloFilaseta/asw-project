const sockjs = require("sockjs");

/**
 * Creates the SockJs Server. Every handler is specified here.
 */
const sockjs_echo = sockjs.createServer();
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

module.exports = sockjs_echo;