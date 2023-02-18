import React, { useState, useEffect, useContext } from 'react';

import Skeleton from '@mui/material/Skeleton';

import ProfileFeed from './ProfileFeed';
import Context from './context/Context';

function Profile() {
  const { userInfo, setAlert } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfilePosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/profile/${userInfo.username}`);
      const data = await res.json();
      if (data.length === 0) {
        setAlert((alerts) => [...alerts, { severity: 'info', message: 'There are no posts to display' }]);
      }
      setPosts(data);
      setIsLoading(false);
    } catch (err) {
      console.log('ERROR: Cannot get profile posts', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in attempting to get user posts' }]);
    }
  };

  useEffect(() => {
    getProfilePosts();
  }, []);

  return (isLoading
    ? (
      <div style={{
        marginTop: '70px',
        height: `${parseInt(window.innerHeight, 10) - 70}px`,
        paddingLeft: '12px',
        paddingRight: '12px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '55% 45%',
        rowGap: '12px',
        justifyItems: 'center',
        alignItems: 'center',
      }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '90%',
          width: '50%',
          minWidth: '750px',
          marginTop: 4,
          padding: 2,
        }}
        >
          <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />
        </div>
        <div className="profile">
          <div className="profileFeed">
            {Array(4).fill(0).map((post, i) => (
              <div className="applications" style={{ minWidth: '250px', padding: '12px' }}>
                <Skeleton variant="rounded" width="100%" height="50%" animation="wave" />
                <div style={{
                  display: 'grid', gridTemplateColumns: '3fr 1fr', columnGap: '4px', width: '100%', height: '30%', paddingBottom: '4px',
                }}
                >
                  <div style={{ display: 'grid', gridTemplateRows: '2fr 1fr 1fr', rowGap: '4px' }}>
                    <Skeleton variant="text" width="100%" height="100%" animation="wave" />
                    <Skeleton variant="text" width="80%" height="100%" animation="wave" />
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 2fr', columnGap: '12px', width: '80%',
                    }}
                    >
                      <Skeleton variant="circular" width="100%" height="100%" animation="wave" />
                      <Skeleton variant="text" width="100%" height="100%" animation="wave" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
    : (
      <div className="profile">
        <ProfileFeed posts={posts} getProfilePosts={getProfilePosts} />
      </div>
    )
  );
}

export default Profile;
