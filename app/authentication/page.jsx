"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function FadeInOut() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setTimeout(() => {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }, 1000);
  };

  return (
    <>
      <button onClick={toggleVisibility}>Toggle Visibility</button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, this is a fading component!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FadeInOut;
