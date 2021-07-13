import { UserFactory } from '../../plugins/db/models/users';

export const insert = (server, body) => new Promise((resolve, reject) => {
    const userDb = UserFactory(server.db);
    const { username, password, email, address } = body;

    userDb.create({ username, password, email, address, createdBy: 'test' })
        .then(data => {
            resolve({ userId: data.userId, username: data.username, createdBy: data.createdBy });
        }).catch(err => {
            reject(err);
        });
});