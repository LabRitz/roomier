/**
 * @jest-environment node
 */

const findUser = require('./findUser');
const User = require('../../db/userModel');

jest.mock('../../db/userModel');

const next = jest.fn();

describe('findUser', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Finds Users if passed userId', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id' },
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    }; 
  
    User.findOne.mockResolvedValue({ acknowledged: true });

    await findUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: true });
  });

  it('Returns 404 if user does not exist', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id' }
    };
  
    User.findOne.mockResolvedValue(false);

    await findUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: findUser",
      status: 404,
      message: {err: 'Cannot find user based on userId'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id' }
    };

    User.findOne.mockRejectedValue(new Error('error'));

    await findUser(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: findUser, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to find a user'}
    });
  });
});