import { UserFactory } from '../../plugins/db/models/users';

export class UserService {
    db: any;

    constructor(db) {
        this.db = db;
    }

    insert = (param) => new Promise((resolve, reject) => {
        const userDb = UserFactory(this.db);
        const { username, password, email, address } = param;

        userDb.create({ username, password, email, address, createdBy: 'test' })
            .then(data => {
                resolve({ userId: data.userId, username: data.username, createdBy: data.createdBy });
            }).catch(err => {
                reject(err);
            });
    });

}