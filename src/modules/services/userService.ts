import { UserFactory } from '../../plugins/db/models/users';

export class UserService {
    db: any;
    userModel;

    constructor(db) {
        this.db = db;
        this.userModel = UserFactory(this.db);
    }

    insert = (param) => new Promise((resolve, reject) => {
        // const userDb = UserFactory(this.db);
        const { username, password, email, address } = param;

        this.userModel.create({ username, password, email, address, createdBy: 'test' })
            .then(data => {
                resolve(data.username);
            }).catch(err => {
                reject(err);
            });
    });

}