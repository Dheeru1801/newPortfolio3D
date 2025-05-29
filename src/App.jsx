import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas, Introduction } from "./components";
import Footer from "./components/Footer";
import ResumeAvatar from "./components/ResumeAvatar";

const App = () => {
  return (
    <BrowserRouter>
      <div className='main-container relative z-0 bg-primary min-h-screen'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />          {/* Add the resume avatar component */}
          <ResumeAvatar />
        </div>
        <Introduction />
        <About />
        <Experience />
        <Tech />
        <Works />
       
        <div className='relative z-0'>
          <Contact />

          <StarsCanvas />
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
