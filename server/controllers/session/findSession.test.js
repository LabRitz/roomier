/**
 * @jest-environment node
 */

const findSession = require('./findSession');
const Session = require('../../db/sessionModel');

jest.mock('../../db/sessionModel');

const next = jest.fn();

describe('findSession', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns next middleware if session exists', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id'},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Session.findOne.mockResolvedValue({});

    await findSession(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('Returns a 200 status and false if no session exists', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id'},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Session.findOne.mockResolvedValue(null);

    await findSession(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().send).toHaveBeenCalledWith(false);
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {};
    const res = {
      locals: { userId: 'user-id'},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Session.findOne.mockRejectedValue(new Error('error'));

    await findSession(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: findSession, Error: error",
      status: 500,
      message: {err: `An error occurred while attempting to find a user session`}
    });
  });
});