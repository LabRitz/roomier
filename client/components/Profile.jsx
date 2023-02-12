import React, { useState, useEffect, useContext } from "react";

import ProfileFeed from "./ProfileFeed.jsx";

import Context from './context/Context.js'

const Profile = () => {
  const { userInfo } = useContext(Context)

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
      <ProfileFeed posts={posts} getProfilePosts={getProfilePosts} />
    </div>
  );
};

export default Profile;
