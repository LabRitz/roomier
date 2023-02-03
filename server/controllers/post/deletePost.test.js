/**
 * @jest-environment node
 */

const deletePost = require('./deletePost');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const next = jest.fn();

describe('deletePost', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns acknowledgement for deleted object', async () => {
    const req = {
      params: { _id: 123 }
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    };

    Post.deleteOne.mockResolvedValue({ acknowledged: true });

    await deletePost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: true });
  });

  it('Returns 409 status with no acknowledgement from database', async () => {
    const req = {
      params: { _id: 123 }
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() })
    };

    Post.deleteOne.mockResolvedValue({ acknowledged: false });

    await deletePost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.status().json).toHaveBeenCalledWith({ acknowledged: false });
  });

  it('Returns 400 status with no params id', async () => {
    const req = {
      params: {}
    };
    const res = {};

    await deletePost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: deletePost`,
      status: 400,
      message: {err: 'Cannot resolve id from params'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { _id: 123 }
    };
    const res = {};

    Post.deleteOne.mockRejectedValue(new Error('error'));

    await deletePost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: deletePost, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to delete a post in profile'}
    });
  });
});