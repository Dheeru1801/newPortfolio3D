import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show' // Using whileInView to trigger animation when entering viewport
        viewport={{ 
          once: true, // Animation only happens once
          amount: 0.25  // Trigger animation when 25% of element is in view
        }}
        className={`${styles.padding} ${idName === 'contact' ? 'max-w-[1320px]' : 'max-w-7xl'} mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
