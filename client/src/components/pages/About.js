import React from "react";
import Hero from "../Hero";
import BeastCard from "../BeastCard";
import * as colors from "./../../constants/colors";

const About = () => (
  <div>
  <Hero />

  <div className="hero-img">
    <div className="beasts-row">
      <BeastCard
        name="Andrew Gaurin"
        img=""
        description="Back End"
        color={colors.purpleFavor}
      />
      <BeastCard name="Ashley Wang"
        img=""
        description="Front End" 
        color={colors.greenFavor}
        />
      <BeastCard name="Abigail Jackson"
        img=""
        description="Back End" 
        color={colors.orangeFavor}
        />
      <BeastCard name="Alice O'Connell"
        img=""
        description="Alice is a Chicago native and a 3L at the Loyola University Chicago School of Law. Her passion for web development emerged from a broader appreciation for technology as a tool for social utility and societal good. She is thrilled to present STYX as a learning experience first and foremost. She plans to move to Washington, D.C. after graduation to work as a legislative aide in the U.S. House of Representatives."
        color={colors.mahoganyFavor}
        />
    </div>
    </div>
    </div>
);

export default About;