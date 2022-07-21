import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBOnee-KSyXhLZu8BtDO9VPbCPpAYUHK_I",
  authDomain: "roomier-1cc68.firebaseapp.com",
  projectId: "roomier-1cc68",
  storageBucket: "roomier-1cc68.appspot.com",
  messagingSenderId: "498568617132",
  appId: "1:498568617132:web:15275ea991c04a880c5309",
  measurementId: "G-H9WYGT2GCD"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
