"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
const users_1 = require("../../plugins/db/models/users");
const insert = (server, body) => new Promise((resolve, reject) => {
    const userDb = users_1.UserFactory(server.db);
    const { username, password, email, address } = body;
    userDb.create({ username, password, email, address, createdBy: 'test' })
        .then(data => {
        resolve({ userId: data.userId, username: data.username, createdBy: data.createdBy });
    }).catch(err => {
        reject(err);
    });
});
exports.insert = insert;
//# sourceMappingURL=user-service.js.map