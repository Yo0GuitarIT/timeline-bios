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
      <div className="lg:text-5xl md:text-4xl text-3xl font-bold w-full text-center">
        <span ref={el} />
      </div>

      <p className="md:text-md lg:text-lg text-sm text-center w-full">
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
