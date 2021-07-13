import fp from 'fastify-plugin';

import { PublishKafkaTO, SubscribeKafkaTO, TopicKafkaTO } from './schema';
import { kafkaSubscribe2 } from '../../../plugins/kafka/consumer';
import { createTopic, publish } from '../../../plugins/kafka/producer';


export default fp((server, opts, next) => {
    server.post("/kafka/subscribe", { schema: SubscribeKafkaTO }, (request, reply) => {
        try {
            const { topic } = request.body;

            let count = 0;
            let data = [];

            kafkaSubscribe2(server, topic, (messages) => {
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

        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});