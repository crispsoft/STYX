import React from "react";
import Hero from "../Hero";
import GameLogin from "../GameLogin";
import BeastCard from "../BeastCard";

const Home = () => (
  <div>
    <Hero />
    

    <GameLogin />

    <div className="hero-img">
      <div className="beasts-row">
        <BeastCard
          name="Cerberus"
          img=""
          description="The gatekeeper of the underworld, Cerberus is a great three-headed dog that ensures only the dead gain an audience with Hades. Even so, the rare living mortal can pass him bye -- be it via a show of great valor or a ploy of substantial cunning."
        />
        <BeastCard name="Pegasus" 
        img=""
        description="The pegasus is a noble and majestic winged horse that is said to ferry worthy heroes to the steps of Olympus itself. Earning the favor of the pegasus will surely ease your passage across the River Styx."/>
        <BeastCard name="Griffin" 
        img=""
        description="Considered to be the king of sky and soil, the majestic Griffin is said to appear only to the valiant and wise alike. Earning its favor may require a display of substantial valor -- but it will surely aid you on your quest."/>
        <BeastCard name="Charybdis" 
        img=""
        description="The reclusive Charybdis is shy, but dangerous, lurking in volatile seas with her sister Scylla. Navigating her waters can prove exceedingly dangerous -- but the sure-eyed and brave will surely find treasure beyond her whirling clutches."/>
      </div>
      <div className="beasts-row">
        <BeastCard name="Sirens" 
        img=""
        description="Syrens are beautiful and alluring crosses between women and birds. They lure brave adventurers into their clutches with pleasing sight and song. Beware, though -- their enticing visages and enchanting voices have drawn many a sailor to an early, watery grave."/>
        <BeastCard name="Hydra" 
        img=""
        description="The Lernean Hydra is a fearsome lake-dwelling serpent with many vicious heads. The Gods, ever fickle, have been known to send heroes and demigods to clash with the serpentine monster in order to prove their strength. The Hydra's favor, while difficult to earn, will surely benefit you on your journey through Hades."/>
        <BeastCard name="Sphynx" 
        img=""
        description="A proud being of staggering intelligence, the legendary Sphynx bestows its blessing upon those who can solve the riddles that it tells. Beware, though -- those who answer incorrectly may find themselves on the receiving end of the creature's legendary anger instead!" />
      </div>
    </div>

    <div className="hero-img" />
  </div>
);

export default Home;
