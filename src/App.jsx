import "./app.scss";
import Contact from "./components/contact/Contact";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Tools from "./components/tools/Tools";
import WorkExperience from "./components/workExperience/WorkExperience";

const App = () => {

  return (
 
    <div>
      {/* <Cursor /> */}
      <section id="hero">
        <Navbar />
        <Hero />
      </section>
      <section id="work">
          <WorkExperience/>
      </section>
      <section id="Portfolio">
      <Portfolio />
      </section>
      <section id="tools">
        <Tools/>
      </section>
      <section id="Services">
        <Services />
      </section>
      <section id="Contact">
        <Contact />
      </section>
    </div>

  );
};

export default App;