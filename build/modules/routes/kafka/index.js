"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const schema_1 = require("./schema");
const consumer_1 = require("../../../plugins/kafka/consumer");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server.post("/kafka/subscribe", { schema: schema_1.SubscribeKafkaTO }, (request, reply) => {
        try {
            const { topic } = request.body;
            let count = 0;
            let data = [];
            consumer_1.kafkaSubscribe2(server, topic, (messages) => {
                count++;
                data.push(messages);
                if (count == messages.highWaterOffset) {
                    return reply.code(200).send({
                        success: true,
                        message: 'Inquiry successful!',
                        data
                    });
                }
            });
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    next();
});
//# sourceMappingURL=index.js.map