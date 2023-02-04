/**
 * @jest-environment node
 */

const deleteSession = require('./deleteSession');
const Session = require('../../db/sessionModel');

jest.mock('../../db/sessionModel');

const next = jest.fn();

describe('deleteSession', () => {

  it('Returns 204 status and true when session is deleted', async () => {
    const req = {};
    const res = {
      locals: { cookieId: 'cookie-id'},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Session.deleteOne.mockResolvedValue({});

    await deleteSession(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.status().send).toHaveBeenCalledWith(true);
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {};
    const res = {
      locals: { cookieId: 'cookie-id'},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Session.deleteOne.mockRejectedValue(new Error('error'));

    await deleteSession(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: deleteSession, Error: error",
      status: 500,
      message: {err: "An error occurred while attempting to delete session in signout"},
    });
  });
});