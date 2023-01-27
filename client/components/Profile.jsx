import React, { useState, useEffect } from "react";

import ProfileFeed from "./ProfileFeed.jsx";

const Profile = ({ userInfo }) => {
  const [posts, setPosts] = useState([]);

  const getProfilePosts = async () => {
    try {
      const res = await fetch(`/profile/${userInfo.username}`)
      const data = await res.json()
      setPosts(data);
    } catch (err) {
      console.log('ERROR: Cannot get profile posts', err)
    }
  }

  useEffect(() => {
    getProfilePosts()
  }, []);

  return (posts && 
    <div className="profile">
      <ProfileFeed posts={posts} getProfilePosts={getProfilePosts}/>
    </div>
  );
};

export default Profile;
