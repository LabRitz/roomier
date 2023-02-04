/**
 * @jest-environment node
 */

const createUser = require('./createUser');
const User = require('../../db/userModel');

jest.mock('../../db/userModel');

const next = jest.fn();

describe('createUser', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Creates Users if passed user object', async () => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com',
        password: '123',
        zipCode: '12345'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    }; 
  
    User.findOne.mockResolvedValue(false);
    User.create.mockResolvedValue({ acknowledged: true });

    await createUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: true });
  });

  it('Returns 409 if user exists', async () => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com',
        password: '123',
        zipCode: '12345'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    }; 
  
    User.findOne.mockResolvedValue(true);

    await createUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.status().json).toHaveBeenCalledWith(null);
  });

  it('Returns 422 with incorrect request body', async () => {
    const req = {
    body: {}
    };
    const res = {};

    await createUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: createUser",
      status: 422,
      message: {err: 'Username or password missing in userContoller.createUser'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com',
        password: '123',
        zipCode: '12345'
      }
    };
    const res = {}; 

    User.findOne.mockRejectedValue(new Error('error'));

    await createUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: createUser, Error: error",
      status: 500,
      message: {err: 'an error occurred when attempting to create a user'}
    });
  });
});