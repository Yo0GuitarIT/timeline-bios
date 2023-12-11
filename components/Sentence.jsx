"use client";

import Typed from "typed.js";
import { useRef, useEffect } from "react";

function Sentence() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Unleash Your Creativity in Music Editing."],
      typeSpeed: 20,
      startDelay: 700,
      loop: false,

      cursorChar: "_",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="lg:text-4xl md:text-2xl font-bold">
        <span ref={el} />
      </div>

      <p className="md:text-base lg:text-2xl text-center ">
        Experience a powerful online Digital Audio Workstation (DAW) at
        timelineβίος.
        <br />
        Elevate your music editing game with user-friendly tools designed to
        inspire creativity.
      </p>

    </>
  );
}

export default Sentence;
