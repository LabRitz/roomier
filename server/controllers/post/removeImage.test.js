/**
 * @jest-environment node
 */

const removeImage = require('./removeImage');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const next = jest.fn();

describe('removeImage', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns modified count and acknowledgement from database', async () => {
    const req = {
      params: { _id: 'test-id' },
      body: {
        imgUrl: 'testUrl',
        imgPath: 'testPath'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Post.updateOne.mockResolvedValue({ modifiedCount: 1 });

    await removeImage(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().send).toHaveBeenCalledWith({ modifiedCount: 1 });
  });

  it('Returns acknowledged update from database', async () => {
    const req = {
      params: { _id: 'test-id' },
      body: {
        imgUrl: 'testUrl',
        imgPath: 'testPath'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Post.updateOne.mockResolvedValue({ modifiedCount: 0 });

    await removeImage(req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.status().send).toHaveBeenCalledWith({ modifiedCount: 0 });
  });

  it('Returns 400 status with no params _id', async () => {
    const req = {
      params: {},
      body: {
        imgUrl: 'testUrl',
        imgPath: 'testPath'
      }
    };
    const res = {}

    await removeImage(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: removeImage`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    });
  });

  it('Returns 400 status with bad request body', async () => {
    const req = {
      params: { _id: 'test-id' },
      body: {}
    };
    const res = {}

    await removeImage(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: removeImage`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { _id: 'test-id' },
      body: {
        imgUrl: 'testUrl',
        imgPath: 'testPath'
      }
    };
    const res = {};

    Post.updateOne.mockRejectedValue(new Error('error'));

    await removeImage(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: removeImage, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to remove image from post'}
    });
  });
});