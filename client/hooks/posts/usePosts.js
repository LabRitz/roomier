import { useQuery } from '@tanstack/react-query';

import { homeStore } from '../../stores/home';
import { error, info } from '../../utils/logger';

export const usePosts = (userInfo, setAlert) => {
  const { center, distance } = homeStore((state) => ({
    center: state.center,
    distance: state.distance,
  }));

  const sendRequest = async () => {
    if (!center) return [];

    try {
      info(`Getting posts for ${userInfo.username}`);
      const res = await fetch(`/home/${userInfo.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lng: center.lng,
          lat: center.lat,
          minDistance: 0,
          maxDistance: distance,
        }),
      });
      const postsArr = await res.json();
      info(`Received ${postsArr.length} posts for ${userInfo.username}`);

      return postsArr;
    } catch (err) {
      error(err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in getting posts at location' }]);
    }
  };

  const queryKey = ['POSTS', center, userInfo];
  const queryConfig = {
    queryKey,
    queryFn: sendRequest,
  };

  const query = useQuery(queryConfig);

  return {
    queryKey,
    queryConfig,
    query,
  };
};
