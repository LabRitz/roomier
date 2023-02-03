const deleteCookie = require('./deleteCookie');

const next = jest.fn();
const clearCookie = jest.fn()

describe('deleteCookie middleware', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('deletes the ssid cookie', () => {
    const req = {
      cookies: {
        ssid: 'test-cookie-id'
      }
    };
    const res = {
      locals: {},
      clearCookie: clearCookie
    };

    deleteCookie(req, res, next);
    expect(res.clearCookie).toHaveBeenCalledWith('ssid');
    expect(res.locals.cookieId).toEqual('test-cookie-id');
    expect(next).toHaveBeenCalled();
  });

  it('handles missing ssid cookie', () => {
    const req = {
      cookies: {}
    };
    const res = {};

    deleteCookie(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: 'ERROR: deleteCookie',
      status: 500,
      message: { err: 'an error occurred while attempting to delete cookie' }
    });
  });
});
