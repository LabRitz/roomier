/**
 * @jest-environment node
 */

const createPost = require('./createPost');

jest.mock('../../db/postModel', () => ({
  create: jest.fn().mockResolvedValue({})
}));

const sendStatus = jest.fn()
const next = jest.fn();

const goodReqBody = {  
  address: {
    street1: 'Street 1',
    street2: 'Street 2',
    city: 'City',
    state: 'State',
    zipCode: '12345'
  },
  roommate: {gender: 'male'},
  description: {
    BR: 1,
    BA: 1,
    sqFt: 100,
    parking: true,
    smoking: true,
    pets: true
  },
  moveInDate: Date.now(),
  utilities: 100,
  rent: 100,
  bio: 'Description',
  images: {
    imgUrl: '',
    imgPath: ''
  },
  geoData: {
    lat: 10,
    lng: 10
  },
  userData: {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com'
  }
}

const badReqBody = {}

describe('createPost', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns newly created post object', async () => {
    const req = {
      body: goodReqBody
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    };

    await createPost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({});
  });

  it('Returns 400 status with bad request body', async () => {
    const req = {
      body: badReqBody
    };
    const res = {
      sendStatus: sendStatus
    };

    await createPost(req, res, next);
    const [status] = sendStatus.mock.calls[0];
    expect(status).toEqual(400);
  });

  xit('Returns 500 status with bad database request', async () => {
    jest.mock('../../db/postModel', () => ({
      create: null
    }));

    const req = {
      body: badReqBody
    };
    const res = {
      sendStatus: sendStatus
    };

    await createPost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: createPost, undefined`,
      status: 500,
      message: {err: 'an error occurred while attempting to create a post'}
    });
  });
});