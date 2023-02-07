import React, { useState, useEffect, useRef } from 'react';
import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import HideImageIcon from '@mui/icons-material/HideImage';

import '../stylesheets/ImageGallery.scss'

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

const ImageGallery = ({ images, setImages, view, userInfo, postId }) => {
  // Initialize states for
  const [imageUpload, setImageUpload] = useState(null);
  const [index, setIndex] = useState(0) // Index for gallery image
  const [success, setSuccess] = useState(false);
  const [imgLoad, setImgLoad] = useState(false)
  const timer = useRef()
  
  const handleUpload = async () => {
    if (imageUpload) {
      setSuccess(false)
      setImgLoad(true)
      const imgPath = `images/${userInfo.username}/${imageUpload.name}`
      const imgRef = ref(storage, imgPath);
      try {
        await uploadBytes(imgRef, imageUpload);
        const imgUrl = await getDownloadURL(imgRef);
        setImages([...images, { imgUrl: imgUrl, imgPath: imgPath }]);
        setIndex(images.length)
        setImgLoad(false)
        setSuccess(true);
        timer.current = window.setTimeout(() => {
          setSuccess(false);
          setImageUpload(null)
        }, 1250);
      } catch (err) {
        console.log('ERROR: Cannot upload to Firebase')
      }
    } else {
      alert("No image selected");
    }
  };

  // Remove picture from image array
  const handleRemove = async () => {
    // Handle for old image data structure
    if (!images[index]['imgUrl']) return alert('Image uploaded on legacy image. Cannot delete. ') 

    const reqBody = { 
      imgUrl: images[index]['imgUrl'], 
      imgPath: images[index]['imgPath'] 
    }

    try {  
      const res = await fetch(`/posts/image/remove/${postId}`, {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      const data = await res.json()
      if (data.modifiedCount == 1) {
        alert('Image successfully removed!')
        getProfilePosts()
      }
      else alert('ERROR: Unable to remove image')
    } catch (err) {
      console.log('ERROR: Cannot remove image', err)
    }
  }

  const handleClick = (dir) => {
    if (index + dir < 0) setIndex(images.length - 1)
    else if (index + dir > images.length - 1) setIndex(0)
    else setIndex(index + dir);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Paper elevation={0} sx={{p: 2, display:'flex', flexDirection:'column', justifyContent:'center', width:'50%'}}>
      <CardMedia
        component="img"
        height="300"
        image={(!images[index]) ? defaultImg : (images[index]['imgUrl'] == undefined) ? Object.keys(images[index])[0] : images[index]['imgUrl']}
      />
      <CardActions sx={{display: 'flex', justifyContent:'space-around'}}>
        <IconButton color="inherit" onClick={() => handleClick(-1)}>
          <ArrowBackIosNewIcon fontSize='medium'/>
        </IconButton>
        <div className="imageUpload">
          { view == 'create' && <>
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
                sx={{"&:hover": {transform: "scale(1.0)"}}}
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
          </>}
          { view == 'edit' && <>    
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
                sx={{"&:hover": {transform: "scale(1.0)"}}}
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
          </>}
        </div>
        
        <IconButton color="inherit" onClick={() => handleClick(1)}>
          <ArrowForwardIosIcon fontSize='medium'/>
        </IconButton>
      </CardActions>
    </Paper>
  );
}

export default ImageGallery;
