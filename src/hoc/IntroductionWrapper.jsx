import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create a wrapper function specifically for the Introduction section with special animation handling
const IntroductionWrapper = (Component, idName) => {
  function HOC() {
    // Use useEffect to handle animation resets when revisiting the section
    useEffect(() => {
      // Reset animations when the url hash changes to the section ID
      const handleHashChange = () => {
        if (window.location.hash === `#${idName}`) {
          resetIntroductionAnimations();
        }
      };
      
      const resetIntroductionAnimations = () => {
        // Get all elements in the Introduction section
        const section = document.getElementById(idName);
        if (!section) return;
        
        // Find elements to animate
        const heading = section.querySelector('.introduction-heading');
        const listItems = section.querySelectorAll('ul li');
        const paragraphs = section.querySelectorAll('p:not(.introduction-heading p)');
        
        // Reset heading animation
        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, x: -80 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
          );
        }
        
        // Reset list items with staggered animation
        if (listItems.length) {
          gsap.fromTo(
            listItems,
            { opacity: 0, x: -60, filter: "blur(4px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.2, ease: "power2.out" }
          );
        }
        
        // Reset paragraphs
        if (paragraphs.length) {
          gsap.fromTo(
            paragraphs,
            { opacity: 0, y: 30, filter: "blur(2px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.3, ease: "power2.out" }
          );
        }
      };
      
      // Add event listener for hash changes
      window.addEventListener('hashchange', handleHashChange);
      
      // Also handle when component first mounts
      if (window.location.hash === `#${idName}`) {
        // Short delay to ensure elements are rendered
        setTimeout(resetIntroductionAnimations, 300);
      }
      
      // Clean up
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []);
    
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ 
          once: false, // Set to false to allow animations to replay when coming back into view
          amount: 0.25
        }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  }
  
  return HOC;
};

export default IntroductionWrapper;
