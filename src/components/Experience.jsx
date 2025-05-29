import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  // Determine direction for animation and timeline side
  const isLeft = index % 2 === 0;
  const direction = isLeft ? "left" : "right";

  return (
    <motion.div
      variants={fadeIn(direction, "spring", 0.2 * index, 1.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ 
        once: false, 
        amount: 0.4  // Element will be considered "in view" when 40% is visible
      }}
      transition={{ 
        type: "spring",
        stiffness: 50,
        damping: 10
      }}
    >
      <VerticalTimelineElement
        contentStyle={{
          background: "#1d1836",
          color: "#fff",
        }}
        contentArrowStyle={isLeft 
          ? { borderRight: "7px solid  #1d1836" }
          : { borderLeft: "7px solid  #1d1836" }}
        date={experience.date}
        iconStyle={{ 
          background: experience.iconBg
        }}
        icon={
          <div className='flex justify-center items-center w-full h-full'>
            <img
              src={experience.icon}
              alt={experience.company_name}
              className='w-[60%] h-[60%] object-contain'
            />
          </div>
        }
        position={isLeft ? "left" : "right"}
      >
        <div>
          <h3 className='text-white text-[20px] font-bold'>{experience.title}</h3>
          <p
            className='text-secondary text-[14px] font-semibold'
            style={{ margin: 0 }}
          >
            {experience.company_name}
          </p>
        </div>

        <ul className='mt-3 list-disc ml-4 space-y-1.5'>
          {experience.points.map((point, idx) => (
            <li
              key={`experience-point-${idx}`}
              className='text-white-100 text-[13px] pl-1 tracking-wider'
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="w-full flex flex-col items-center">
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-12 flex flex-col'>
        <VerticalTimeline
          lineColor="#915EFF"
          animate={true}
          className="vertical-timeline-custom-line"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
