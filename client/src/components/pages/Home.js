import React from "react";
import Hero from "../Hero";
import BeastCard from "../BeastCard";
import * as colors from "./../../constants/colors";

const Home = () => (
  <div>
    <Hero />

    <div className="hero-img">
      <div className="beasts-row">
        <BeastCard
          name="Cerberus"
          img="/assets/favors_white/Anger_Ceraberos.png"
          description="The gatekeeper of the underworld, Cerberus is a great three-headed dog that ensures only the dead gain an audience with Hades. Even so, the rare living mortal can pass him bye -- be it via a show of great valor or a ploy of substantial cunning."
          color={colors.purpleFavor}
        />
        <BeastCard name="Pegasus"
          img="/assets/favors_white/Envy_pegasus.png"
          description="The pegasus is a noble and majestic winged horse that is said to ferry worthy heroes to the steps of Olympus itself. Earning the favor of the pegasus will surely ease your passage across the River Styx." 
          color={colors.greenFavor}
          />
        <BeastCard name="Griffin"
          img="/assets/favors_white/Pride_Griffin.png"
          description="Considered to be the king of sky and soil, the majestic Griffin is said to appear only to the valiant and wise alike. Earning its favor may require a display of substantial valor -- but it will surely aid you on your quest." 
          color={colors.orangeFavor}
          />
        <BeastCard name="Charybdis"
          img="/assets/favors_white/Gluttony_Charybdis.png"
          description="The reclusive Charybdis is shy, but dangerous, lurking in volatile seas with her sister Scylla. Navigating her waters can prove exceedingly dangerous -- but the sure-eyed and brave will surely find treasure beyond her whirling clutches."
          color={colors.mahoganyFavor}
          />
      </div>
      <div className="beasts-row">
        <BeastCard name="Sirens"
          img="/assets/favors_white/Lust_Sirens.png"
          description="Syrens are beautiful and alluring crosses between women and birds. They lure brave adventurers into their clutches with pleasing sight and song. Beware, though -- their enticing visages and enchanting voices have drawn many a sailor to an early, watery grave." 
          color={colors.redFavor}
          />
        <BeastCard name="The Furies"
          img="/assets/favors_white/Greed_Furies.png"
          description="The Furies are the daughters of Night itself and the goddesses of vengeance incarnate. Guardians of the Underworld's laws and punishers of the wicked, the Furies are not to be trifled with. Nevertheless, if your heart is pure and your cause is just, they may well grant you their collective favor." 
          color={colors.yellowFavor}
          />
        <BeastCard name="Sphynx"
          img="/assets/favors_white/Sloth_Sphinx.png"
          description="A proud being of staggering intelligence, the legendary Sphynx bestows its blessing upon those who can solve the riddles that it tells. Beware, though -- those who answer incorrectly may find themselves on the receiving end of the creature's legendary anger instead!"
          color={colors.blueFavor}
          />
      </div>
    </div>

    <div className="hero-img" />
  </div>
);

export default Home;
