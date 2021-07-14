import { KafkaClientOptions } from 'kafka-node';

const kafkaConfig = (server): KafkaClientOptions => ({
    kafkaHost: server.conf.kafkaHost,
    autoConnect: true,
    reconnectOnIdle: true,
});

const kafkaConfigTest = (server): KafkaClientOptions => ({
    kafkaHost: server.conf.kafkaHost,
    autoConnect: true,
    reconnectOnIdle: true,
});

export {
    kafkaConfig,
    kafkaConfigTest
}