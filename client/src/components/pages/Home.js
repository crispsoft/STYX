import React, { Component } from "react";
import BeastCard from "../BeastCard";

import { WavyBackground } from './page.styles';
import * as colors from "./../../constants/colors";

const pStyle = {
  fontFamily: "Imprima, sansSerif",
  textAlign: "center"
}
class Home extends Component {

  constructor(props) {
    super(props);
    this.BeastRowRef = React.createRef();
  }

  scrollToBeastRowRef = () =>
    window.scrollTo({
      left: 0,
      top: this.BeastRowRef.current.offsetTop,
      behavior: "smooth"
    });

  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-img">
            <h1 className="hero-text">STYX</h1>
            <br />
            <div className="game-lore">
              <div className="intro-tag">
                Welcome, brave adventurers, to the shores of the River Styx.
              </div>
              <br />
              <p style={pStyle}>
                Hades, the Greek God of the Underworld, has grown bored with his
                role as jailer. He has promised great riches to those who can
                successfully cross the river and enter into the underworld.
                Discover ancient wonders and learn about the beasts and creaures
                of Greek myth; earn their favor, and Hades' treasure will be
                yours!
              </p>
            </div>
            <div onClick={this.scrollToBeastRowRef} className="round">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <WavyBackground>
          <div ref={this.BeastRowRef} className="beasts-row">
            <BeastCard
              name="Cerberus"
              img="/assets/beasts_white/Anger_Ceraberos.png"
              description="The gatekeeper of the underworld, Cerberus is a great three-headed dog that ensures only the dead gain an audience with Hades. Even so, the rare living mortal can pass him bye -- be it via a show of great valor or a ploy of substantial cunning."
              color={colors.purpleFavor}
              style={pStyle}
            />
            <BeastCard
              name="The Furies"
              img="/assets/beasts_white/Greed_Furies.png"
              description="The Furies are the daughters of Night itself and the goddesses of vengeance incarnate. Guardians of the Underworld's laws and punishers of the wicked, the Furies are not to be trifled with. Nevertheless, if your heart is pure and your cause is just, they may well grant you their collective favor."
              color={colors.greenFavor}
              style={pStyle}
            />
            <BeastCard
              name="Griffin"
              img="/assets/beasts_white/Pride_Griffin.png"
              description="Considered to be the king of sky and soil, the majestic Griffin is said to appear only to the valiant and wise alike. Earning its favor may require a display of substantial valor -- but it will surely aid you on your quest."
              color={colors.orangeFavor}
              style={pStyle}
            />
            <BeastCard
              name="Charybdis"
              img="/assets/beasts_white/Gluttony_Charybdis.png"
              description="The reclusive Charybdis is shy, but dangerous, lurking in volatile seas with her sister Scylla. Navigating her waters can prove exceedingly dangerous -- but the sure-eyed and brave will surely find treasure beyond her whirling clutches."
              color={colors.mahoganyFavor}
              style={pStyle}
            />
          </div>
          <div className="beasts-row">
            <BeastCard
              name="Sirens"
              img="/assets/beasts_white/Lust_Sirens.png"
              description="Syrens are beautiful and alluring crosses between women and birds. They lure brave adventurers into their clutches with pleasing sight and song. Beware, though -- their enticing visages and enchanting voices have drawn many a sailor to an early, watery grave."
              color={colors.redFavor}
              style={pStyle}
            />
            <BeastCard
              name="Pegasus"
              img="/assets/beasts_white/Envy_pegasus.png"
              description="The pegasus is a noble and majestic winged horse that is said to ferry worthy heroes to the steps of Olympus itself. Earning the favor of the pegasus will surely ease your passage across the River Styx."
              color={colors.yellowFavor}
              style={pStyle}
            />
            <BeastCard
              name="Sphynx"
              img="/assets/beasts_white/Sloth_Sphinx.png"
              description="A proud being of staggering intelligence, the legendary Sphynx bestows its blessing upon those who can solve the riddles that it tells. Beware, though -- those who answer incorrectly may find themselves on the receiving end of the creature's legendary anger instead!"
              color={colors.blueFavor}
              style={pStyle}
            />
          </div>
        </WavyBackground>
      </div>
    );
  }
}

export default Home;
