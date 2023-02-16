import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';

import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import HomeFeed from './HomeFeed';

import Context from './context/Context';
import { mapContainerStyle, dotStyle, boundaryStyle } from './styles/googleMaps';

const GoogleMapsAPIKey = 'AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM';
Geocode.setApiKey(GoogleMapsAPIKey);

function Home() {
  const { userInfo, setAlert } = useContext(Context);

  const [filterArr, setFilterArr] = useState([]);
  const [posts, setPosts] = useState([]);

  const [zipCode, setZipCode] = useState(userInfo.zipCode);
  const [center, setCenter] = useState(null);
  const [distance, setDistance] = useState(1609.344 * 2);
  const [priceRange, setPriceRange] = useState([3000, 8000]);
  const [sqftRange, setSqftRange] = useState([200, 1500]);
  const [br, setBR] = useState(0);
  const [ba, setBA] = useState(1);

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
      const geocode = await Geocode.fromAddress(zipCode);
      if (geocode.status === 'OK') {
        const { lng, lat } = geocode.results[0].geometry.location;
        return { lat, lng };
      }
      setAlert((alerts) => [...alerts, { severity: 'warn', message: 'Cannot find zip code' }]);
    } catch (err) {
      console.log('ERROR: Cannot find zipcode', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in identifying zip code' }]);
    }
  }, [zipCode]);

  const getGeo = async () => {
    setCenter(await geo);
  };

  const getPosts = async () => {
    if (!center) return setPosts([]);
    try {
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
      setPosts(postsArr);
    } catch (err) {
      console.log('ERROR: Cannot get posts at zip code', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in getting posts at location' }]);
    }
  };

  const filterPosts = useMemo(() => {
    if (posts.length === 0) return [];
    return posts.filter((post) => {
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
  }, [zipCode]);

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
        >
          <Circle center={center} options={dotStyle} />
          <Circle center={center} options={{ ...boundaryStyle, ...{ radius: distance } }} />
          {markers}
        </GoogleMap>
      </div>
      <HomeFeed
        posts={filterPosts}
        zipCode={zipCode}
        setZipCode={setZipCode}
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
      />
    </div>
  );
}

export default Home;
