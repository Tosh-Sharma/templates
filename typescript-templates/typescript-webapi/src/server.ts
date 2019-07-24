import dotenv from 'dotenv';
import http from 'http';

import { App } from './app';

// Set file path for Application using process environment.
const filePath = process.env.ENV ? `src/config/${process.env.ENV.toLowerCase()}/.env` : 'src/.env';
dotenv.config({path: filePath});
/**
 * Get port from environment and store in Express. 
 */
const port = normalizePort(process.env.PORT || '8080');
const app = new App().express;
app.set('port', port);

/**
 * Create HTTP Server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string or false.
 */
function normalizePort(val: any) {
    const calculatedPort = parseInt(val, 10);

    if (isNaN(calculatedPort)) {
        // Named pipe.
        return val;
    }
    if (calculatedPort >= 0) {
        // Port Number.
        return calculatedPort;
    }

    return false;
}

/**
 * Event listener for HTTP Server 'error' event.
 */
function onError(error: any) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe' + port: 'Port' + port;

    // Handle specific listen errors with friendly messages
    switch(error.code) {
        case 'EACCESS':
            // Log the error using a Logger.
            process.exit(1);
            break;
        case 'EADDRINUSE':
            // Log the error using a Logger.
            process.exit(1);
            break;
        default: throw error;
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

 function onListening() {
     const addr = server.address();
     const bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + addr.port;
     //Log information of `Server is listening on ${bind}` 
 }