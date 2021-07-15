import { createServer } from './server'
import { KafkaMonitor } from './modules/services/kafkaService';
import { JobUser } from './modules/services/jobUser'

createServer()
    .then((server: any) => {
        server.log.info('Server started.');

        server.kafkaClient.on('ready', () => {
            server.log.info('Kafka Client Connection has been established successfully.');

            // running kafka monitor
            const kafkaMonitor = new KafkaMonitor(server);
            kafkaMonitor.subscribeTopicBook();
        });

        server.kafkaClient.on('error', (err) => {
            server.log.info('Server not connected to Kafka');
        });

        const apmServerStatus = server.apm.isStarted();
        if (apmServerStatus) {
            server.log.info('Server connected to APM Server');
        } else {
            server.log.info('Server not connected to APM Server');
        }

        const job = new JobUser(server.db);
        server.scheduler.scheduler.addSimpleIntervalJob(job.jobInsertUser);

    }).catch(error => {
        // do something
        console.log(error);
    });

