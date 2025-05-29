import React, { useRef, useEffect } from "react";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      // Apply the entrance animation (slide in from the side)
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          onComplete: () => {
            // Ensure elements remain visible after animation completes
            gsap.set(elementRef.current, { opacity: 1, visibility: "visible" });
          },
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%", // Trigger when element is 85% into the viewport
            end: "bottom 5%",
            toggleActions: "play none none none", // Play animation only once when entering
            once: true, // Animation only plays once
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 100, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
  }, index * 0.2);
    return (
    <div ref={cardRef} className="xs:w-[210px] w-full">
      <div 
        className="w-full green-pink-gradient p-[1px] rounded-[16px] shadow-card spin-y-on-hover" 
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d' 
        }}
      >
        <div className="bg-black rounded-[16px] py-3 px-8 min-h-[210px] flex justify-evenly items-center flex-col">
          <img src={icon} alt="web-development" className="w-12 h-12 object-contain" />
          <h3 className="text-white text-[17px] font-bold text-center">{title}</h3>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  // Heading Animation - slides in from left
  useGsap(headingRef, {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
  });

  // Paragraph Animation - slides in from bottom
  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);  // References for individual text elements
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  // Add animations for each text section with staggered delays
  useGsap(textRef1, {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  }, 0.4);

  useGsap(textRef2, {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  }, 0.5);

  useGsap(textRef3, {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  }, 0.6);
  return (
    <>
      <div ref={headingRef}>
        <p className={`${styles.sectionSubText}`}>About Me</p>
        <h2 className={`${styles.sectionHeadText}`}>Services.</h2>
      </div>
      
      <div className="mt-3 text-secondary text-[15px] max-w-3xl leading-[26px]">
        <p ref={textRef1} className="mt-4">
          I offer a wide range of services including front-end and back-end development,
          machine learning solutions, and data analytics.
        </p>
        
        <p ref={textRef2} className="mt-2">
          Check out the services below to see how I can help with your project.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
