const Post = require('../../db/postModel');

const updateApplicationPost = async (req,res,next) => {
  const { firstName, lastName, username } = req.body;
  const id = req.params._id;
  
  if (!firstName || !lastName || !username || !id) {
    return next({
      log: `ERROR: updateApplicationPost`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    })
  }
  
  try {
    // Step1: Find the post matching the id
    const foundPost = await Post.findOne({ _id : id })

    // Step2: Linear search the post's applicantData array and find a match with applicantData.username
    for (const applicant of foundPost.applicantData) {
      if (applicant.username === username) return res.status(409).send(false);
    }

    const newApplicant = {
      firstName: firstName,
      lastName: lastName,
      username: username
    };

    // continue if user is not applicant
    const queryResult = await Post.updateOne(
      { _id : id },
      { $push: { applicantData: newApplicant } }
    )
    return res.status(201).send(queryResult.acknowledged);
  } catch (err) {
    return next ({
      log: `ERROR: updateApplicationPost, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to update the applications # int he posts'}
    })
  }
};

module.exports = updateApplicationPost;