import { useState } from 'react';
import {storage} from './firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const UploadImage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imgArr, setImgArr] = useState([])
  
  const firebaseUploadImage = async () => {
    if (imageUpload) {
      const imgRef = ref(storage, `images/${imageUpload.name}`);
      await uploadBytes(imgRef, imageUpload);
      const imgURL = await getDownloadURL(imgRef);
      const imgObj = {};
      imgObj[imgURL] = `images/${imageUpload.name}`;
      const newArr = [...imgArr, imgObj]
      setImgArr(newArr);
      console.log(imgArr);
    }
    else {
      console.log('it failed')
    }
  }

  return (
    <div className="imageUpload">
      <input type={"file"} multiple onChange={(e) => setImageUpload(e.target.files[0])}></input>
      <button type='submit' onClick={firebaseUploadImage}>Upload Image</button>
      <img id="img"></img>
    </div>
  );
}

export default UploadImage;
