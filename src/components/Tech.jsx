import React, { useEffect } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  useEffect(() => {
    gsap.fromTo(
      ".section-heading", 
      {
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-heading",
          start: "top 80%",
        },
      }
    );    gsap.fromTo(
      ".tech-card", 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,        scrollTrigger: {
          trigger: ".tech-icons-wrapper", 
          start: "top 80%",
          end: "bottom 20%",
          once: true, // Animation plays only once
          onEnter: () => {
            // Ensure tech cards remain visible permanently once they appear
            gsap.set(".tech-card", { opacity: 1, y: 0 });
          }
        },
      }
    );
  }, []);

  return (
    <section>      <div className="flex flex-col items-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center section-heading`}>
          Technical Skills
        </h2>
      </div>

      <div className="tech-icons-wrapper flex flex-row flex-wrap justify-center gap-6">
        {technologies.map((technology) => (
          <div 
            className="tech-card flex flex-col items-center justify-center w-20 group" 
            key={technology.name}
          >
            <div className="w-16 h-16 mb-1 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:z-10">
              <img
                src={technology.icon}
                alt={technology.name}
                className="tech-icon w-full h-full object-contain drop-shadow-none group-hover:drop-shadow-lg"
              />
            </div>
            <p className="text-[12px] text-center text-secondary font-medium">
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "skills");
