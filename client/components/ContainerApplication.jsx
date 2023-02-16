import React, { useContext } from 'react';

import ContainerFeed from './ContainerFeed';
import Context from './context/Context';

import '../stylesheets/containerApplication.scss';

function ContainerApplications({
  getProfilePosts, postInfo, setPostInfo, setEditMode,
}) {
  const { setAlert } = useContext(Context);

  const handleUpdate = () => {
    setPostInfo(postInfo);
    setEditMode(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/posts/${postInfo._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.deletedCount === 1) {
        setAlert((alerts) => [...alerts, { severity: 'success', message: 'Post successfully removed' }]);
        getProfilePosts();
      } else setAlert((alerts) => [...alerts, { severity: 'error', message: 'Unable to delete post' }]);
    } catch (err) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in delete post' }]);
    }
  };

  return (
    <div className="applications">
      <ContainerFeed
        post={postInfo}
        setPostInfo={setPostInfo}
        view="profile"
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        setEditMode={setEditMode}
      />
    </div>
  );
}

export default ContainerApplications;
