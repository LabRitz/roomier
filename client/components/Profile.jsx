import React, { Component, useState, useEffect } from "react";

import ProfileFeed from "./ProfileFeed.jsx";

const Profile = ({ userInfo }) => {
  const userData = userInfo;
  // console.log('metaData from profile: ', userData)

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`/profile/${userData.username}`)
      .then((data) => data.json())
      .then((postsArr) => {
        setPosts(postsArr);
        return (
          <>
            <div className="profile">
              <ProfileFeed props={posts} />
            </div>
          </>
        );
      });
  }, []);

  if (posts) {
    return (
      <>
        <div className="profile">
          <ProfileFeed props={posts} />
        </div>
      </>
    );
  } else return null;
};

export default Profile;
