import { kafkaSubscribe2 } from '../../plugins/kafka/consumer'

export class KafkaMonitor {
    server: any;

    constructor(serverInstance) {
        this.server = serverInstance;
    }

    subscribeTopicBook = async () => {
        kafkaSubscribe2(this.server, 'bookInsert', (messages) => {
            this.server.log.info(messages);
        });

    };
}