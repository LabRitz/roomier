import { useQuery } from '@tanstack/react-query';
import Geocode from 'react-geocode';

import { homeStore } from '../../stores/home';

export const useGeocode = (setAlert) => {
  const { zipcode } = homeStore((state) => ({
    zipcode: state.zipcode,
  }));

  const sendRequest = async () => {
    try {
      const geocode = await Geocode.fromAddress(zipcode);
      if (geocode.status === 'OK') {
        const { lng, lat } = geocode.results[0].geometry.location;

        return { lat, lng };
      }
      setAlert((alerts) => [...alerts, { severity: 'warn', message: 'Cannot find zip code' }]);
    } catch (err) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in identifying zip code' }]);
    }
  };

  const queryKey = ['GEOCODE', zipcode];
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
