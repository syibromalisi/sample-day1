import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { UserTO, GetUserTO } from './schema';
import { UserFactory, UsersAttributes } from '../../../plugins/db/models/users';

import { UserService } from '../../services/userService'

export default fp((server, opts, next) => {
    const userService = new UserService(server.db);

    server.post("/user/model/insert", { schema: UserTO }, (request, reply) => {
        try {

            const { username, password } = request.body;
            if (username && password) {
                userService.insert(request.body).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data,
                    });
                }).catch(err => {

                    const { message, stack } = err;
                    let errorMsg = {

                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        message,
                        stack
                    };
                    server.apm.captureError(JSON.stringify(errorMsg));

                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record',
                        err,
                    });
                })
            } else {
                const message = 'Insert failed! Please check the request';
                let errorMsg = {

                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    message,
                };
                server.apm.captureError(JSON.stringify(errorMsg));

                return reply.code(400).send({
                    success: false,
                    message
                });
            }

        } catch (error) {
            const { message, stack } = error;
            let errorMsg = {

                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                message,
                stack
            };
            server.apm.captureError(JSON.stringify(errorMsg));

            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/user/insert", { schema: UserTO }, (request, reply) => {
        try {
            const { username, password, email, address } = request.body;

            if (username && password) {
                const query = `INSERT INTO [dbo].[USERS] ([Username],[Password],[email],[address],[CreatedBy],[CreatedDate])
                     VALUES('${username}', '${password}', '${email}', '${address}' ,'test', GETDATE())`;

                server.db.query(query, {
                    type: Sequelize.QueryTypes.INSERT
                }).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data,
                    });
                }).catch(err => {
                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record',
                        err,
                    });
                });

            } else {
                return reply.code(400).send({
                    success: false,
                    message: 'Insert failed! Please check the request'
                });
            }

        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });


    next();
});