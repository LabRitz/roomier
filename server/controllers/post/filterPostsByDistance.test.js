/**
 * @jest-environment node
 */

const filterPostsByDistance = require('./filterPostsByDistance');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const sendStatus = jest.fn()
const next = jest.fn();

describe('filterPostsByDistance', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns found posts', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
      body: {
        lng: 10,
        lat: 10, 
        minDistance: 1,
        maxDistance: 2
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    };

    Post.find.mockResolvedValue({ acknowledged: true });

    await filterPostsByDistance(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: true });
  });

  it('Returns 400 status with no params username', async () => {
    const req = {
      params: {},
      body: {
        lng: 10,
        lat: 10, 
        minDistance: 1,
        maxDistance: 2
      }
    };
    const res = {
      sendStatus: sendStatus
    };

    await filterPostsByDistance(req, res, next);
    expect(sendStatus).toHaveBeenCalledWith(400)
  });

  it('Returns 400 status with bad request body', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
      body: {}
    };
    const res = {
      sendStatus: sendStatus
    };

    await filterPostsByDistance(req, res, next);
    expect(sendStatus).toHaveBeenCalledWith(400)
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
      body: {
        lng: 10,
        lat: 10, 
        minDistance: 1,
        maxDistance: 2
      }
    };
    const res = {};

    Post.find.mockRejectedValue(new Error('error'));

    await filterPostsByDistance(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: filterPostsByDistance, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to filter for posts'}
    });
  });
});