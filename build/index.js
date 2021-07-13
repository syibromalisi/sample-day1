"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.createServer()
    .then((server) => {
    server.log.info('Server started.');
    server.kafkaClient.on('ready', () => {
        server.log.info('Kafka Client Connection has been established successfully.');
    });
    server.kafkaClient.on('error', (err) => {
        server.log.info('Server not connected to Kafka');
    });
    const apmServerStatus = server.apm.isStarted();
    if (apmServerStatus) {
        server.log.info('Server connected to APM Server');
    }
    else {
        server.log.info('Server not connected to APM Server');
    }
}).catch(error => {
    // do something
    console.log(error);
});
//# sourceMappingURL=index.js.map