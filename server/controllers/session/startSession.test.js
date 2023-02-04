/**
 * @jest-environment node
 */

const startSession = require('./startSession');
const Session = require('../../db/sessionModel');

jest.mock('../../db/sessionModel');

const next = jest.fn();

describe('startSession', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Creates sessions if passed user object', async () => {
    const req = {};
    const res = {
      locals: { user: { _id: 'user-id'} } ,
    };

    Session.create.mockResolvedValue({});

    await startSession(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('Returns next middleware if no user object', async () => {
    const req = {};
    const res = {
      locals: {},
    };

    Session.create.mockResolvedValue({});

    await startSession(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {};
    const res = {
      locals: { user: { _id: 'user-id'} } ,
    };

    Session.create.mockRejectedValue(new Error('error'));

    await startSession(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: startSession, Error: error",
      status: 500,
      message: { err: 'an error occured while attempting to start a session'}
    });
  });
});