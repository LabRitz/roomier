const getCookie = require('./getCookie');

const next = jest.fn();

describe('getCookie middleware', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Finds ssid cookie', async () => {
    const req = {
      cookies: {
        ssid: 'test-cookie-id'
      }
    };
    const res = {
      locals: {},
    };

    await getCookie(req, res, next);
    
    expect(res.locals.userId).toEqual('test-cookie-id');
    expect(next).toHaveBeenCalled();
  });

  it('Unable to find ssid cookie', async() => {
    const req = {
      cookies: {}
    };
    const res = {
      locals: {},
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    await getCookie(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().send).toHaveBeenCalledWith(false);
  });
});
