/**
 * @jest-environment node
 */

const verifyUser = require('./verifyUser');
const User = require('../../db/userModel');
const bcrypt = require('bcryptjs')

jest.mock('../../db/userModel');
jest.mock('bcryptjs')

const next = jest.fn();

describe('verifyUser', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Verfies user credentials', async () => {
    const req = {
      body: {
        username: 'test@gmail.com',
        password: '123'
      }
    };
    const res = {
      locals: {},
    }; 
  
    User.findOne.mockResolvedValue(true);
    bcrypt.compare.mockResolvedValue(true)

    await verifyUser(req, res, next);
    expect(res.locals.user).toEqual(true)
    expect(next).toHaveBeenCalledWith();
  });

  it('Passes no user object to next fn if user not found', async () => {
    const req = {
      body: {
        username: 'badUser',
        password: 'badPassword'
      }
    };
    const res = {
      locals: {},
    }; 
  
    User.findOne.mockResolvedValue(false);

    await verifyUser(req, res, next);
    expect(res.locals.user).toEqual(null)
    expect(next).toHaveBeenCalledWith();
  });

  it('Passes null value to next fn if password does not match', async () => {
    const req = {
      body: {
        username: 'test@gmail.com',
        password: 'badPassword'
      }
    };
    const res = {
      locals: {},
    }; 
  
    User.findOne.mockResolvedValue(true);
    bcrypt.compare.mockResolvedValue(false)

    await verifyUser(req, res, next);
    expect(res.locals.user).toEqual(null)
    expect(next).toHaveBeenCalledWith();
  });

  it('Returns 400 if bad request body', async () => {
    const req = {
      body: {}
    };
    const res = {};
  
    await verifyUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: verifyUser`,
      status: 400,
      message: {err: 'Could not resolve username or password'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      body: {
        username: 'test@gmail.com',
        password: 'badPassword'
      }
    };
    const res = {
      locals: {},
    }; 

    User.findOne.mockRejectedValue(new Error('error'));

    await verifyUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: verifyUser, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to verify a user'}
    });
  });
});