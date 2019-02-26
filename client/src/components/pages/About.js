import React from "react";

import AboutHero from "../AboutHero";
import AboutCard from "../AboutCard";

import { WavyBackground } from './page.styles';

import * as colors from "./../../constants/colors";


const About = () => (

  <WavyBackground>

    <AboutHero />

    <div className="beasts-row">

      <AboutCard
        name="Andrew Gaurin"
        img=""
        description="Andrew Gaurin is a software engineer focused on designing both code and its architecture to be maintainable, extensible, comprehendible, and secure."
        color={colors.purpleFavor}
      />

      <AboutCard name="Ashley Wang"
        img=""
        description="From gaining experience in web development and insight into the tech world, she decided to merge these skills and experiences with her graphic skills as well as design experience along with my passion of working cooperatively with others. She enjoys long walks on the beach and eating food."
        color={colors.greenFavor}
      />

      <AboutCard name="Abigail Jackson"
        img=""
        description="Abigail Jackson is a front-end web developer, designer, + creative living and working in Chicago. She loves collaborating with other dreamers and writing code to that one lo-fi hiphop video on Youtube."
        color={colors.orangeFavor}
      />

      <AboutCard name="Alice O'Connell"
        img=""
        description="Alice is a Chicago native and a 3L at the Loyola University Chicago School of Law. Her passion for web development emerged from a broader appreciation for technology as a tool for social utility and societal good."
        color={colors.mahoganyFavor}
      />

    </div>

  </WavyBackground>
);

export default About;