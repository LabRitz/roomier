/**
 * @jest-environment node
 */

const updateApplicationPost = require('./updateApplicationPost');
const Post = require('../../db/postModel');

jest.mock('../../db/postModel');

const next = jest.fn();

describe('updateApplicationPost', () => {

  beforeEach(() => {
    next.mockClear()
  })

  it('Returns acknowledgement from database', async () => {
    const req = {
      params: { _id: 123 },
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Post.findOne.mockResolvedValue({ 
      applicantData: []
    });

    Post.updateOne.mockResolvedValue({ acknowledged: true })

    await updateApplicationPost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().send).toHaveBeenCalledWith(true);
  });

  it('Returns 409 if applicant already applied', async () => {
    const req = {
      params: { _id: 123 },
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com'
      }
    };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() })
    };

    Post.findOne.mockResolvedValue({ 
      applicantData: [{ username: 'test@gmail.com' }]
    });

    await updateApplicationPost(req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.status().send).toHaveBeenCalledWith(false);
  });

  it('Returns 400 status with no params _id', async () => {
    const req = {
      params: {},
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com'
      }
    };
    const res = {}

    await updateApplicationPost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: updateApplicationPost`,
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

    await updateApplicationPost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: `ERROR: updateApplicationPost`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    });
  });

  it('Returns 500 status with error in database request', async () => {
    const req = {
      params: { _id: 123 },
      body: {
        firstName: 'John',
        lastName: 'Smith',
        username: 'test@gmail.com'
      }
    };
    const res = {};

    Post.findOne.mockRejectedValue(new Error('error'));

    await updateApplicationPost(req, res, next);
    const [error] = next.mock.calls[0];
    expect(error).toEqual({
      log: "ERROR: updateApplicationPost, Error: error",
      status: 500,
      message: {err: 'an error occurred while attempting to update the applications # int he posts'}
    });
  });
});