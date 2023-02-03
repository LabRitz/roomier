const setSSIDCookie = require('./setSSIDCookie');

const cookie = jest.fn()
const next = jest.fn();

describe('setSSIDCookie middleware', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Finds ssid cookie', () => {
    const req = {}
    const res = {
      cookie: cookie,
      locals: { user: { _id: 'test_id' } },
    };

    setSSIDCookie(req, res, next);
    
    expect(cookie).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('no user passed', () => {
    const req = {}
    const res = {
      locals: { user: null },
    };

    setSSIDCookie(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
