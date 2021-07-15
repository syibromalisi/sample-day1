import { SimpleIntervalJob, AsyncTask, Task } from 'toad-scheduler'

import { UserService } from './userService'

let counter = 10;

export class JobUser {
    db: any;

    constructor(db) {
        this.db = db;
    }

    insertUser = async () => {
        console.log(`----------------Start Job----------------`);
        try {
            const userService = new UserService(this.db);

            console.log('JobRunning1');
            counter++

            const dataInputUser = {
                username: `${counter}mockUsername`,
                password: `${counter}mockPassword`,
                email: `${counter}mockEmail@example.com`,
                createdBy: `${counter}mockLogin`,
                address: `${counter}mockAddressLogin`
            };


            await userService.insert(dataInputUser);

        } catch (error) {
            console.error('JobRunning1 - error');
        } finally {
            console.log(`----------------End of Job----------------`);
        }
    };

    // must use promise
    taskInsertUser = new AsyncTask('jobDummyInsertUser', this.insertUser, err => {
        console.log('JobRunning1 - error', err);
    });

    jobInsertUser = new SimpleIntervalJob({ seconds: 15, runImmediately: true }, this.taskInsertUser, 'jobDummyInsertUser');

    // this.server.scheduler.addSimpleIntervalJob(this.job1);

}