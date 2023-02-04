/**
 * @jest-environment node
 */

const updatePost = require('./updatePost');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const next = jest.fn();

describe('updatePost', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns acknowledgement from database', async () => {
    const req = {
      params: { _id: 123 },
      body: {
        address: 'address', 
        rent: 100,
        roommate: 'roommate',
        description: 'description',
        moveInDate: Date.now(),
        bio: 'bio',
        geoData: 'geoData'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Post.updateOne.mockResolvedValue({ acknowledged: true });

    await updatePost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().send).toHaveBeenCalledWith(true);
  });

  it('Returns 400 status with no params _id', async () => {
    const req = {
      params: {},
      body: {
        address: 'address', 
        rent: 100,
        roommate: 'roommate',
        description: 'description',
        moveInDate: Date.now(),
        bio: 'bio',
        geoData: 'geoData'
      }
    };
    const res = {}

    await updatePost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: updatePost`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    });
  });

  it('Returns 400 status with bad request body', async () => {
    const req = {
      params: { _id: 123 },
      body: {}
    };
    const res = {}

    await updatePost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: updatePost`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { _id: 123 },
      body: {
        address: 'address', 
        rent: 100,
        roommate: 'roommate',
        description: 'description',
        moveInDate: Date.now(),
        bio: 'bio',
        geoData: 'geoData'
      }
    };
    const res = {};

    Post.updateOne.mockRejectedValue(new Error('error'));

    await updatePost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: updatePost, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to update the posts'}
    });
  });
});