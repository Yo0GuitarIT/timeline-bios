// "use client"

// import { useEffect, useState } from "react";
// import { storage, getFirebaseStorageUrl } from "@/lib/firebase";

// function UrlPage() {
//   const [link, setLink] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = await getFirebaseStorageUrl("soundTracks/01.Drum.mp3");
//       setLink(url);
//     };
//     fetchData();
//   }, []);

//   console.log(link);
//   return <div>Link: {link}</div>;
// }

// export default UrlPage;

// "use client";

// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

// export function ToastSimple() {
//   const { toast } = useToast();

//   return (
//     <Button
//       variant="outline"
//       onClick={() => {
//         toast({
//           description: "Your message has been sent.",
//         });
//       }}
//     >
//       Show Toast
//     </Button>
//   );
// }

// export default ToastSimple;

// "use client";

// import { useEffect } from "react";

// export default function MyPage() {
//   const handleOnBeforeunload = (event) => {
//     event.preventDefault();
//     return (event.returnValue = "");
//   };

//   useEffect(() => {
//     window.addEventListener("beforeunload", handleOnBeforeunload, {
//       capture: true,
//     });

//     return () => {
//       window.removeEventListener("beforeunload", handleOnBeforeunload, {
//         capture: true,
//       });
//     };
//   }, []);

//   return <>My Page</>;
// }

