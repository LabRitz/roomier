import React, { useState, useEffect, useContext } from 'react';

import ProfileFeed from './ProfileFeed';

import Context from './context/Context';

function Profile() {
  const { userInfo, setAlert } = useContext(Context);

  const [posts, setPosts] = useState([]);

  const getProfilePosts = async () => {
    try {
      const res = await fetch(`/profile/${userInfo.username}`);
      const data = await res.json();
      if (data.length === 0) {
        setAlert((alerts) => [...alerts, { severity: 'info', message: 'There are no posts to display' }]);
      }
      setPosts(data);
    } catch (err) {
      console.log('ERROR: Cannot get profile posts', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in attempting to get user posts' }]);
    }
  };

  useEffect(() => {
    getProfilePosts();
  }, []);

  return (posts
    && (
    <div className="profile">
      <ProfileFeed posts={posts} getProfilePosts={getProfilePosts} />
    </div>
    )
  );
}

export default Profile;
