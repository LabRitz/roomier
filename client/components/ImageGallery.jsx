import React, {
  useState, useEffect, useMemo, useContext, useCallback,
} from 'react';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import HideImageIcon from '@mui/icons-material/HideImage';

import { DEFAULT_IMAGE } from '../assets/constants';
import { useImageUpload } from '../hooks/posts/useImageUpload';

import Context from './context/Context';

import '../stylesheets/imageGallery.scss';

const ImageGallery = ({
  images, setImages, view, postId,
}) => {
  const { setAlert } = useContext(Context);

  // Initialize states for
  const [imageUpload, setImageUpload] = useState(null);
  // const [upload, setUpload] = useState(false)
  const [index, setIndex] = useState(0); // Index for gallery image
  const [success, setSuccess] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  // const timer = useRef();

  const { query: useImageUploadQuery } = useImageUpload({ imageUpload, imgLoad });

  const isImageUploading = useMemo(() => {
    return useImageUploadQuery.isLoading;
  }, [useImageUploadQuery.isLoading]);

  const uploadImage = useMemo(() => useImageUploadQuery.data ?? undefined, [useImageUploadQuery.data]);

  const displayImage = useMemo(() => {
    if (!images[index]) return DEFAULT_IMAGE;

    if (images[index].imgUrl === undefined) {
      return Object.keys(images[index])[0];
    }

    return images[index].imgUrl;
  }, [images, index]);

  const handleUpload = useCallback(() => {
    if (!imageUpload) {
      return setAlert((alerts) => [...alerts, { severity: 'warn', message: 'No image selected' }]);
    }

    // Sets enabled flag in image upload hook
    setImgLoad(true);
    setAlert((alerts) => [...alerts, { severity: 'success', message: 'Successfully uploaded' }]);
  }, [imageUpload, setAlert]);

  useEffect(() => {
    if (imageUpload && imgLoad) {
      if (useImageUploadQuery.isSuccess) {
        setImgLoad(false);
        setSuccess(true);
        setImages([...images, uploadImage]);
        setTimeout(() => {
          setSuccess(false);
          setImageUpload(null);
        }, 1500);
      }
    }
  }, [imageUpload, images, imgLoad, setImages, uploadImage, useImageUploadQuery.isSuccess]);

  // Remove picture from image array
  const handleRemove = async () => {
    // Handle for old image data structure
    if (!images[index].imgUrl) {
      return setAlert((alerts) => [
        ...alerts,
        { severity: 'warn', message: 'Image uploaded on legacy image. Cannot delete.' },
      ]);
    }

    const reqBody = {
      imgUrl: images[index].imgUrl,
      imgPath: images[index].imgPath,
    };

    try {
      const res = await fetch(`/posts/image/remove/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      const isSuccess = data.modifiedCount === 1;

      setAlert((alerts) => {
        return [
          ...alerts,
          {
            severity: isSuccess ? 'success' : 'error',
            message: isSuccess ? 'Image successfully removed' : 'Unable to remove image',
          },
        ];
      });
    } catch (err) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while removing image' }]);
    }
  };

  const handleClick = (dir) => {
    if (index + dir < 0) {
      setIndex(images.length - 1);
    } else if (index + dir > images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + dir);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%',
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={displayImage}
      />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <IconButton color="inherit" onClick={() => handleClick(-1)}>
          <ArrowBackIosNewIcon fontSize="medium" />
        </IconButton>
        <div className="imageUpload">
          { view === 'create' && (
            <>
              <Box sx={{ m: 1 }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <CollectionsIcon />
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => setImageUpload(e.target.files[0])}
                  />
                </Button>
              </Box>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  variant="contained"
                  component="label"
                  disabled={imgLoad}
                  onClick={handleUpload}
                  sx={{ '&:hover': { transform: 'scale(1.0)' } }}
                >
                  {success ? <CheckIcon /> : <FileUploadIcon />}
                </Button>
                {isImageUploading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </>
          )}
          { view === 'edit' && (
            <>
              <Box sx={{ m: 1 }}>
                <Button
                  variant="contained"
                  component="label"
                  onClick={(e) => handleRemove(e)}
                >
                  <HideImageIcon />
                </Button>
              </Box>
              <Box sx={{ m: 1 }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  <CollectionsIcon />
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => setImageUpload(e.target.files[0])}
                  />
                </Button>
              </Box>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  variant="contained"
                  component="label"
                  disabled={imgLoad}
                  onClick={handleUpload}
                  sx={{ '&:hover': { transform: 'scale(1.0)' } }}
                >
                  {success ? <CheckIcon /> : <FileUploadIcon />}
                </Button>
                {imgLoad && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </>
          )}
        </div>

        <IconButton color="inherit" onClick={() => handleClick(1)}>
          <ArrowForwardIosIcon fontSize="medium" />
        </IconButton>
      </CardActions>
    </Paper>
  );
};

export default ImageGallery;
