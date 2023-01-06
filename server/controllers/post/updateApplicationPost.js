const Post = require('../../db/postModel');

const updateApplicationPost = async (req,res,next) => {
  try {
    const { firstName, lastName, username } = req.body;
    const id = req.params._id;

    const newApplicant = {
      firstName: firstName,
      lastName: lastName,
      username: username
    };

    // Step1: Find the post matching the id
    const foundPost = await Post.findOne({ _id : id })

    // Step2: Linear search the post's applicantData array and find a match with applicantData.username
    for (let i = 0; i < foundPost.applicantData.length; i++) {
      if (foundPost.applicantData[i].username === username) return res.status(200).send(false);
    }

    // continue if user is not applicant
    const queryResult = await Post.updateOne(
      { _id : id },
      { $push: { applicantData: newApplicant } }
    )
    return res.status(200).send(queryResult.acknowledged);
  } catch (err) {
    return next ({
      log: `ERROR: updateApplicationPost, ${err}`,
      message: {err: 'an error occurred while attempting to update the applications # int he posts'}
    })
  }
};

module.exports = updateApplicationPost;