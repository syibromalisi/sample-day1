import { UserService } from "../modules/services/userService";

import SequelizeMock from 'sequelize-mock';

// let server: any;
// beforeAll(async () => {
//   server = await instance.createServer();
// });

describe('User class', () => {
  const dbMock = new SequelizeMock();

  const dataInput = {
    username: 'mockUsername',
    password: 'mockPassword',
    email: 'mockEmail@example.com',
    createdBy: 'mockLogin',
    address: 'mockAddressLogin'
  };

  const userService = new UserService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(userService, 'insert')
  
  it('should insert data', async () => {  
    const insertData = await userService.insert(dataInput);
    expect(insertData).toBeTruthy()
    expect(userService.insert).toHaveBeenCalledTimes(1)
  });
});
