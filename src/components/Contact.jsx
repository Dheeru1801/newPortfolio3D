import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import Toast from "./Toast";



const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } =e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
// EDqtJ2RijxXKRgk6d
// template_oju6wof
// service_h3i8lu8
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!form.name || !form.email || !form.message) {
      setLoading(false);
      setToast({
        visible: true,
        message: "Please fill in all fields",
        type: "error"
      });
      return;
    }

    emailjs
      .send(
        'service_h3i8lu8',
        'template_oju6wof',
        {
          from_name: form.name,
          to_name: "dcTempEst",
          from_email: form.email,
          to_email: "dctempest1801@gmail.com",
          message: form.message,
        },
        'EDqtJ2RijxXKRgk6d'
      )
      .then(
        () => {
          setLoading(false);
          setToast({
            visible: true,
            message: "Thank you! I will get back to you as soon as possible.",
            type: "success"
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          setToast({
            visible: true,
            message: "Something went wrong. Please try again.",
            type: "error"
          });
        }
      );
  };

  return (
    <>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden max-w-[1280px] w-full mx-auto`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.8] bg-black-100 p-8 rounded-2xl'
        >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-6 w-full'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your Message</span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              className='bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-2.5 px-7 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-tertiary/80 transition-all duration-300'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[500px] h-[320px]'
      >
        <EarthCanvas />
      </motion.div>
      </div>

      {/* Toast notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={closeToast} 
      />
    </>
  );
};

export default SectionWrapper(Contact, "contact");
