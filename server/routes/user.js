const path = require("path");
const express = require("express");
const router = express.Router();

// Require all controllers
const user = require("../controllers/user");
const post = require("../controllers/post");
const cookie = require("../controllers/cookie");
const session = require("../controllers/session");

// Serve index.html to client
router.get("/health", (req, res) => res.sendStatus(200))
router.get("/home/:username", post.getAllPosts);
router.get(
  "/currentSession",
  cookie.getCookie,
  session.findSession,
  user.findUser
);
router.get("/profile/:username", post.getProfilePosts);
router.get("/signout", cookie.deleteCookie, session.deleteSession);
// router.get('/findUser',
//   user.findUser,
//   (req, res) => {
//     // post.createPost
//     return res.status(200).json({});
// });
router.get("/", (req, res) =>
  res.status(201).sendFile(path.resolve(__dirname, "../../index.html"))
);

router.post("/signup", user.createUser);
router.post("/home/:username", post.filterPostsByDistance);
router.post("/createPost", post.createPost);
router.post("/oauth",
  user.verifyUser,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);
router.post("/",
  user.verifyUser,
  cookie.setSSIDCookie,
  session.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  }
);


router.patch("/home/:_id", post.updateApplicationPost);
router.patch("/posts/update/:_id", post.updatePost);
router.patch("/posts/image/remove/:_id", post.removeImage);


router.delete("/posts/:_id", post.deletePost);

module.exports = router;
