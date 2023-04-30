import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import { useTheme } from '@mui/material/styles';

import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import HomeFeed from './HomeFeed';

import Context from './context/Context';
import { error, info } from '../utils/logger';
import { homeStore } from '../stores/home';

import {
  mapContainerStyle, darkModeStyle, darkDotStyle, darkBoundaryStyle,
  lightBoundaryStyle, lightModeStyle, lightDotStyle,
} from './styles/googleMaps';

const GoogleMapsAPIKey = 'AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM';
Geocode.setApiKey(GoogleMapsAPIKey);

const Home = () => {
  const { 
    zipcode,
    center,
    distance,
    priceRange,
    sqftRange,
    br,
    ba,
    setZipcode,
    setCenter,
    setDistance,
    setPriceRange,
    setSqftRange,
    setBA,
    setBR
  } = homeStore((state) => 
    ({
      zipcode: state.zipcode,
      center: state.center,
      distance: state.distance, 
      priceRange: state.priceRange,
      sqftRange: state.sqftRange,
      br: state.br,
      ba: state.ba,
      setZipcode: state.setZipcode,
      setCenter: state.setCenter,
      setDistance: state.setDistance,
      setPriceRange: state.setPriceRange,
      setSqftRange: state.setSqftRange,
      setBR: state.setBR,
      setBA: state.setBA
    }));

  const theme = useTheme();
  const { userInfo, setAlert } = useContext(Context);

  const [filterArr, setFilterArr] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Google Maps
  const [mapref, setMapRef] = useState(null);
  const handleOnLoad = (map) => { setMapRef(map); };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  const geo = useMemo(async () => {
    try {
      const geocode = await Geocode.fromAddress(zipcode);
      if (geocode.status === 'OK') {
        const { lng, lat } = geocode.results[0].geometry.location;
        return { lat, lng };
      }
      setAlert((alerts) => [...alerts, { severity: 'warn', message: 'Cannot find zip code' }]);
    } catch (err) {
      console.log('ERROR: Cannot find zipcode', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in identifying zip code' }]);
    }
  }, [zipcode]);

  const getGeo = async () => {
    setCenter(await geo);
  };

  const getPosts = async () => {
    if (!center) return setPosts([]);
    setIsLoading(true);
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
      setPosts(postsArr);
    } catch (err) {
      error(err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in getting posts at location' }]);
    }
  };

  const filterPosts = useMemo(() => {
    if (posts.length === 0) return [];
    const results = posts.filter((post) => {
      if (post.rent >= priceRange[0]
          && post.rent <= priceRange[1]
          && post.description.sqFt >= sqftRange[0]
          && post.description.sqFt <= sqftRange[1]
          && post.description.BR >= br
          && post.description.BA >= ba) {
        if (filterArr.length !== 0) {
          filterArr.map((filter) => {
            if (post.description[filter.toLowerCase()]) {
              return true;
            }
          });
        } else return true;
      } else return false;
    });
    setIsLoading(false);
    return results;
  }, [posts, filterArr, priceRange, sqftRange, br, ba]);

  const markers = useMemo(() => {
    if (filterPosts.length === 0) return [];
    return filterPosts.map((post, i) => {
      if (post.geoData) {
        const posObj = {
          lng: post.geoData.coordinates[0],
          lat: post.geoData.coordinates[1],
        };
        return <Marker key={i} position={posObj} />;
      } console.log('ALERT: Post contains no geospatial data');
    });
  }, [filterPosts]);

  // Cascading dependency of useEffect
  // 1. Get Posts based on ZipCode and Distance
  // 2. Filter posts by user filter
  // 3. Configure markers based on posts
  useEffect(() => {
    getGeo();
  }, [zipcode]);

  useEffect(() => {
    getPosts();
  }, [center, distance]);

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
          <Circle center={center} options={(theme.palette.mode === 'dark') ? darkDotStyle : lightDotStyle} />
          <Circle center={center} options={(theme.palette.mode === 'dark') ? { ...darkBoundaryStyle, ...{ radius: distance } } : { ...lightBoundaryStyle, ...{ radius: distance } }} />
          {markers}
        </GoogleMap>
      </div>
      <HomeFeed
        posts={filterPosts}
        zipCode={zipcode}
        setZipCode={setZipcode}
        distance={distance}
        setDistance={setDistance}
        filterArr={filterArr}
        setFilterArr={setFilterArr}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sqftRange={sqftRange}
        setSqftRange={setSqftRange}
        br={br}
        setBR={setBR}
        ba={ba}
        setBA={setBA}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Home;
