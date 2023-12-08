// firebase.js

import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-RaNkTecLnoRTfBJvJh2KRbWRF3eMoG8",
  authDomain: "timelinebios.firebaseapp.com",
  projectId: "timelinebios",
  storageBucket: "timelinebios.appspot.com",
  messagingSenderId: "753208834757",
  appId: "1:753208834757:web:c145e355bab7ce9ae38eac",
  measurementId: "G-VKWK830J5M",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const getFirebaseStorageUrl = async (filePath) => {
  const storageRef = ref(storage, filePath);

  try {
    // Get download URL
    const url = await getDownloadURL(storageRef);

    // Fetch the file using the Fetch API
    const response = await fetch(url);
    const blob = await response.blob();

    // Handle the blob as needed, e.g., create a local URL
    const localUrl = URL.createObjectURL(blob);
    
    return localUrl; // or return url if you prefer working with the original URL
  } catch (error) {
    console.error('Error getting Firebase Storage URL:', error);
    return null;
  }
};

export { storage, getFirebaseStorageUrl, ref };
