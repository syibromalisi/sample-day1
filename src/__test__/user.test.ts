import * as instance from '../server';
import SequelizeMock from 'sequelize-mock';

import { UserService } from "../modules/services/userService";


//---------------------------------------------------------//
const dataInputUser = {
  username: '1mockUsername',
  password: '1mockPassword',
  email: '1mockEmail@example.com',
  createdBy: '1mockLogin',
  address: '1mockAddressLogin'
};


const mockLoginData = {
  username: "testusername",
  password: "testpassword"
};

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSJ9.KLDiMFN3QkOAS8mprDbCoYu1t4yPcmvBZaqtQYti38I";

jest.setTimeout(12000);

let server: any;
beforeAll(async () => {
  server = await instance.createServer();
});


describe('server test', () => {

  test("GET returns 200", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
      headers: {
        'Authorization': token
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('{"hello":"world"}');

  });

});

describe('user: insert', () => {

  const dataMockResp = {
    "success": "true",
    "message": "Insert successful!",
    "data": {
      ...dataInputUser,
      "createdBy": mockLoginData.username
    }
  }

  test("POST returns 200", async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/user/model/insert',
      headers: {
        'Authorization': token
      },
      body: dataInputUser
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload).message).toBe('Insert successful!');

  });

});


//---------------------------------------------------------//

describe('User class', () => {
  const dbMock = new SequelizeMock();

  const userService = new UserService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(userService, 'insert');

  it('should insert data', async () => {
    const insertData = await userService.insert(dataInputUser);
    expect(insertData).toEqual('mockUsername');
    expect(userService.insert).toHaveBeenCalledTimes(1);
  });
});
