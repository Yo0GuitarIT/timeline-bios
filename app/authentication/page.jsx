"use client"

import { useEffect, useState } from "react";
import { storage, getFirebaseStorageUrl } from "@/lib/firebase";

function UrlPage() {
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = await getFirebaseStorageUrl("soundTracks/01.Drum.mp3");
      setLink(url);
    };
    fetchData();
  }, []);

  console.log(link);
  return <div>Link: {link}</div>;
}

export default UrlPage;
