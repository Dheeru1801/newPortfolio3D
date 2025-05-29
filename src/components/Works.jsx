import React, { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { initCardVisibility } from "../utils/cardVisibility";
import './CardStyles.css';
import './ProjectCardAnimations.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    const el = cardRef.current;
    
    // Mark element for animation
    el.setAttribute('data-animate', 'true');
    
    // Initial entrance animation - fade in and brighten
    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.92,
        filter: "brightness(0.7)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "brightness(1)",
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: "top 70%",  // Trigger when the top of the card enters 70% up from bottom (30% into view)
          end: "bottom 50%",  // End animation when bottom of card is 50% up from bottom
          scrub: false,      // Discrete animation, not scrubbed
          markers: false,    // Set to `true` to see debug markers
          toggleActions: "play none none none", // Only play animation when entering
          once: true         // Animation only happens once
        },
      }
    );
  }, []);

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };  return (
    <div 
      ref={cardRef} 
      className={`card-container ${isFlipped ? 'card-flipped' : ''}`}
      style={{ width: "100%", maxWidth: "340px", height: "450px" }}
    >
      <div className="card-inner card-hover-effect">
        {/* Front of Card */}
        <div className="card-front">
          <div className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col">            <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
              <img
                src={image}
                alt="project_image"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-in-out"
              />

              <div className="absolute inset-0 flex justify-end m-3">
                <div
                  onClick={(e) => {
                    e.stopPropagation(); 
                    window.open(source_code_link, "_blank");
                  }}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-1/2 h-1/2 object-contain"
                    style={{ position: 'relative', top: '0px', left: '0px' }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <h3 className="text-white font-bold text-[18px] break-words mr-3" style={{ maxWidth: "calc(100% - 40px)" }}>{name}</h3>
              
              <div 
                onClick={handleFlip}
                className="info-button black-gradient shrink-0"
              >
                <div className="text-white text-lg font-bold">i</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="card-back">
          <div className="bg-tertiary p-4 rounded-2xl w-full h-full flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-[20px] mb-3">{name}</h3>
              <div className="overflow-y-auto h-[170px] pr-2">
                <p className="text-secondary text-[13px]">{description}</p>
              </div>
            </div>
              <div className="mt-3">
                <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <p
                    key={`${name}-${tag.name}`}
                    className={`text-[12px] ${tag.color} inline-flex items-center`}
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
              
              <button
                onClick={handleFlip}
                className="border border-secondary py-1.5 px-3 rounded-lg text-white hover:bg-secondary/30 transition-all duration-300 w-full hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02]"
              >
                Back to Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  useEffect(() => {
    // Stagger effect for project cards with fade-in from dark to bright
    gsap.fromTo(
      ".project-card", // Select all project cards
      {
        opacity: 0,
        scale: 0.9,
        filter: "brightness(0.5)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "brightness(1)",
        duration: 1.2,
        stagger: 0.15, // Increased stagger delay between cards for better visual effect
        scrollTrigger: {
          trigger: ".works-container",
          start: "top 70%",  // Trigger when 30% of container is in view (70% from top)
          end: "bottom center", // End when the bottom reaches the center of viewport
          scrub: false,        // Discrete animations
          markers: false,      // Set to true to see debug markers
          once: true,          // Animation only happens once
          onEnter: () => {
            // When elements enter viewport, ensure they permanently stay visible
            gsap.set(".project-card", { opacity: 1, visibility: 'visible' });
          },
        },
      }
    );
    
    // Initialize the card visibility system (fade when < 40% visible)
    initCardVisibility();
    
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>
      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[15px] max-w-3xl leading-[26px]">
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </p>
      </div>      <div className="works-container mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {projects.map((project, index) => (
          <div 
            key={`project-${index}`} 
            className="project-card w-full flex items-center justify-center"
          >
            <ProjectCard index={index} {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
