// metadata is for post creation data

/* 
  username: {type: String, required: true}, - email
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  profilePicture: {type: Buffer},
  id: {type: String, required: true}
*/

const metadata = require('../../db/metadata');

const createPost = async (req, res, next) => {
  try {
    // deconstruct
    const { username, firstName, lastName, createdAt, id } = req.body;

    // place in db
    const newMeta = await metadata.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      createdAt: createdAt,
      id: id
    })

    res.locals.newMeta = newMeta;
    return next();

  } catch (err) {
    return next({
      log: `ERROR: createPost, ${err}`,
      message: { err: 'an error occurred while attempting to create a post in Meta data controller...' }
    })
  }
};

module.exports = createPost;