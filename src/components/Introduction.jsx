import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, paragraphVariant } from "../utils/motion";
import "./IntroductionAnimation.css";

const Introduction = () => {  useEffect(() => {
    const handleVisibilityChange = () => {
      // Check if the section is currently visible in viewport
      const section = document.getElementById('introduction');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const isVisible = 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.bottom >= 0;
        if (isVisible) {
        // Reset animations for heading
        const heading = section.querySelector('.introduction-heading');
        const headingText = section.querySelector('.introduction-heading p');
        const overviewText = section.querySelector('.overview-text');
        
        // Animate heading elements
        if (headingText && overviewText) {
          // First animate the INTRODUCTION text
          headingText.style.opacity = "0";
          headingText.style.transform = "translateX(-50px)";
          
          setTimeout(() => {
            headingText.style.opacity = "1"; 
            headingText.style.transform = "translateX(0)";
          }, 100);
          
          // Then animate the Overview text
          overviewText.style.opacity = "0";
          overviewText.style.transform = "translateX(-70px)";
          
          setTimeout(() => {
            overviewText.style.opacity = "1";
            overviewText.style.transform = "translateX(0)";
          }, 300);
        }
        
        // Reset animations for list items
        section.querySelectorAll('li').forEach((el, index) => {
          el.style.opacity = "0";
          el.style.transform = "translateX(-30px)";
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, 600 + (index * 100)); // Staggered delay after heading animation
        });        // Animate paragraph container first
        const paragraphContainer = section.querySelector('.paragraph-container');
        if (paragraphContainer) {
          paragraphContainer.style.opacity = "0";
          paragraphContainer.style.transform = "translateX(-20px)";
          
          setTimeout(() => {
            paragraphContainer.style.opacity = "1";
            paragraphContainer.style.transform = "translateX(0)";
            
            // Then animate individual paragraphs with enhanced entrance effect
            section.querySelectorAll('.paragraph-content').forEach((el, index) => {
              el.style.opacity = "0";
              el.style.transform = "translateX(-60px)";
              el.style.filter = "blur(2px)";
              
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
                el.style.filter = "blur(0)";
              }, 200 + (index * 250)); // Shorter delay after container animation
            });
          }, 900); // Delayed after list items
        }
      }
    };
    
    // Listen for scroll to detect when section enters/leaves viewport
    window.addEventListener('scroll', handleVisibilityChange);
    window.addEventListener('hashchange', handleVisibilityChange);
    
    // Initial check
    setTimeout(handleVisibilityChange, 300);
    
    return () => {
      window.removeEventListener('scroll', handleVisibilityChange);
      window.removeEventListener('hashchange', handleVisibilityChange);
    };
  }, []);
    return (
    <>
      <motion.div 
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="introduction-heading"
      >
        <motion.p 
          variants={{
            hidden: { opacity: 0, x: -50 },
            show: { 
              opacity: 1, 
              x: 0,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.8
              }
            }
          }}
          className={`${styles.sectionSubText}`}
        >
          INTRODUCTION
        </motion.p>
        <motion.h2 
          variants={{
            hidden: { opacity: 0, x: -70 },
            show: { 
              opacity: 1, 
              x: 0,
              transition: { 
                type: "spring",
                stiffness: 70,
                delay: 0.2,
                duration: 1.2
              }
            }
          }}
          className={`${styles.sectionHeadText} overview-text`}
        >
          Overview.
        </motion.h2>
      </motion.div>
      
      <motion.ul
        variants={fadeIn("left", "", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="mt-4 mb-2 list-disc list-inside space-y-2 text-secondary text-[15px] max-w-3xl leading-[26px]"
      >
        <li>Skilled Machine Learning Practitioner and Full Stack Developer with experience in Python, React, and data-driven development.</li>
        <li>Specialize in frameworks like React, Node.js, and Three.js.</li>
        <li>Build intelligent systems, using tools like TensorFlow, PyTorch, and advanced algorithms like BERT, Neural Networks, etc.</li>
      </motion.ul>      <motion.div
        variants={fadeIn("left", "spring", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="paragraph-container"
      >
        <motion.p 
          variants={paragraphVariant(0.3)}
          className="mt-4 text-secondary text-[15px] max-w-3xl leading-[26px] paragraph-content"
        >
          I'm a quick learner who collaborates closely with clients to craft efficient, scalable, and user-friendly 
          solutions—whether that means building interactive web applications or training ML models to solve complex problems.
        </motion.p>
        
        <motion.p        
          variants={paragraphVariant(0.5)}
          className="mt-4 text-secondary font-medium text-[16px] max-w-3xl leading-[26px] paragraph-content highlight-paragraph"
        >
          Let's work together to bring your ideas to life with the power of both code and data!
        </motion.p>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Introduction, "introduction");
