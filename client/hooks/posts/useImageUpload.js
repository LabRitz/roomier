import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import storage from '../../components/utils/firebase';
import Context from '../../components/context/Context';
import { error } from '../../utils/logger';

export const useImageUpload = ({ imageUpload, imgLoad }) => {
  const { userInfo, setAlert } = useContext(Context);

  const imgPath = useMemo(() => {
    if (!imageUpload) return null;

    return `images/${userInfo.username}/${imageUpload.name}`;
  }, [imageUpload, userInfo.username]);

  const imgRef = useMemo(() => {
    if (!imgPath) return null;

    return ref(storage, imgPath);
  }, [imgPath]);

  const sendRequest = useCallback(async () => {
    if (!imageUpload) return false;

    try {
      await uploadBytes(imgRef, imageUpload);
      const imgUrl = await getDownloadURL(imgRef);

      return {
        imgUrl,
        imgPath,
      };
    } catch (err) {
      error(err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while uploading image' }]);
    }
  }, [imageUpload, imgPath, imgRef, setAlert]);

  const queryKey = useMemo(() => ['IMAGE', imageUpload], [imageUpload]);
  const queryConfig = useMemo(() => ({
    queryKey,
    queryFn: sendRequest,
    enabled: (!!imageUpload && !!imgLoad),
  }), [imageUpload, imgLoad, queryKey, sendRequest]);

  const query = useQuery(queryConfig);

  return {
    queryKey,
    queryConfig,
    query,
  };
};
