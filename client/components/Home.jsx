import React, {
  useCallback, useState, useEffect, useContext, useMemo,
} from 'react';
import { useTheme } from '@mui/material/styles';
import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

import { homeStore } from '../stores/home';
import { useGeocode } from '../hooks/posts/useGeocode';
import { usePosts } from '../hooks/posts/usePosts';

import HomeFeed from './HomeFeed';
import Context from './context/Context';
import {
  mapContainerStyle, darkModeStyle, darkDotStyle, darkBoundaryStyle,
  lightBoundaryStyle, lightModeStyle, lightDotStyle,
} from './styles/googleMaps';

const GoogleMapsAPIKey = 'AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM';
Geocode.setApiKey(GoogleMapsAPIKey);

const Home = () => {
  const {
    center,
    distance,
    priceRange,
    sqftRange,
    br,
    ba,
    filters,
    setCenter,
  } = homeStore((state) => ({
    center: state.center,
    distance: state.distance,
    priceRange: state.priceRange,
    sqftRange: state.sqftRange,
    br: state.br,
    ba: state.ba,
    filters: state.filters,
    setCenter: state.setCenter,
  }));

  const theme = useTheme();
  const { userInfo, setAlert } = useContext(Context);

  // Google Maps
  const [mapref, setMapRef] = useState(null);
  const handleOnLoad = (map) => { setMapRef(map); };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();

      setCenter({ lat, lng });
    }
  };

  const { query: useGeocodeQuery } = useGeocode(setAlert);
  const isGeocodeLoading = useMemo(() => useGeocodeQuery.isLoading, [useGeocodeQuery.isLoading]);
  const geocode = useMemo(() => {
    if (isGeocodeLoading) return { lat: 0, lng: 0 };

    return useGeocodeQuery.data;
  }, [isGeocodeLoading, useGeocodeQuery.data]);

  useEffect(() => {
    setCenter(geocode);
  }, [geocode, setCenter]);

  const { query: usePostsQuery } = usePosts(userInfo, setAlert);
  const isPostsLoading = useMemo(() => usePostsQuery.isLoading, [usePostsQuery.isLoading]);
  const posts = useMemo(() => {
    if (isPostsLoading) return [];

    return usePostsQuery.data ?? [];
  }, [isPostsLoading, usePostsQuery.data]);

  const isLoading = useMemo(() => isGeocodeLoading || isPostsLoading, [isGeocodeLoading, isPostsLoading]);

  // Lambda function to determine if values meet range or min criteria
  const isInRange = useCallback((value, range) => {
    if (Array.isArray(range)) {
      return value >= range[0] && value <= range[1];
    }

    return value >= range;
  }, []);

  // Filter posts based on user criteria
  const filterPosts = useMemo(() => {
    if (posts.length === 0) return [];

    const results = posts.filter((post) => {
      if (isInRange(post.rent, priceRange)
          && isInRange(post.description.sqFt, sqftRange)
          && isInRange(post.description.BR, br)
          && isInRange(post.description.BA, ba)) {
        if (filters.length !== 0) {
          filters.map((filter) => {
            if (post.description[filter.toLowerCase()]) {
              return true;
            }
          });
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

    return results;
  }, [posts, isInRange, priceRange, sqftRange, br, ba, filters]);

  // Convert posts to markers on Maps
  const markers = useMemo(() => {
    if (filterPosts.length === 0) return [];

    return filterPosts.map((post, i) => {
      if (!post.geoData) return;

      const posObj = {
        lng: post.geoData.coordinates[0],
        lat: post.geoData.coordinates[1],
      };

      return <Marker key={i} position={posObj} />;
    });
  }, [filterPosts]);

  return (
    <div className="home">
      <div id="googleMapDiv">
        <GoogleMap
          center={center}
          clickableIcons
          mapContainerStyle={mapContainerStyle}
          onLoad={handleOnLoad}
          onDragEnd={handleCenterChanged}
          zoom={13}
          options={{
            keyboardShortcuts: false,
            fullscreenControl: false,
            styles: (theme.palette.mode === 'dark') ? darkModeStyle : [],
          }}
        >
          <Circle
            center={center}
            options={(theme.palette.mode === 'dark') ? darkDotStyle : lightDotStyle}
          />
          <Circle
            center={center}
            options={
              (theme.palette.mode === 'dark')
                ? { ...darkBoundaryStyle, ...{ radius: distance } }
                : { ...lightBoundaryStyle, ...{ radius: distance } }
            }
          />
          {markers}
        </GoogleMap>
      </div>
      <HomeFeed posts={filterPosts} isLoading={isLoading} />
    </div>
  );
};

export default Home;
