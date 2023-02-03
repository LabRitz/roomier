/**
 * @jest-environment node
 */

const getAllPosts = require('./getAllPosts');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const sendStatus = jest.fn()
const next = jest.fn();

describe('getAllPosts', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns found posts', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    };

    Post.find.mockResolvedValue({ acknowledged: true });

    await getAllPosts(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: true });
  });

  it('Returns 404 status unable to find user in database', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
    };
    const res = {};

    Post.find.mockResolvedValue(false);

    await getAllPosts(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: getAllPosts`,
      status: 404,
      message: {err: 'Cannot find posts for user'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { username: 'test@gmail.com'},
    };
    const res = {};

    Post.find.mockRejectedValue(new Error('error'));

    await getAllPosts(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: getAllPosts, Error: error",
      status: 500,
    message: {err: 'an error occurred while attempting to get a post'}
    });
  });
});