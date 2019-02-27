import React from 'react';

import Typography from "@material-ui/core/Typography";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";

import "./style.css";


/*
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});
 */

class RulesCard extends React.Component {
  render() {
    // const { classes } = this.props;
    return (
      <div className="rulescard">
        <div className="modal-title">
          <Typography variant="h3" id="modal-title-text">
            RULES
          </Typography>
        </div>
        <div className="rules-column-container">
          <div className="rules-column">
            <Typography variant="h6" id="rules-title">
              Turn Sequence
            </Typography>
            <Typography variant="body1" id="rules-text">
                <p><strong>Exchange:</strong> Trade in your Beast Favors (colors) for Obols (points).</p>
                <p><strong>Place Tile:</strong> End your turn by placing a River Tile.
                  <br/><br/>Everyone will receive a Beast Favor matching the color oriented towards them.
                  <br/><br/>You will gain additional Beast Favors for matching two tiles of the same color.
                </p>
            </Typography>
          </div>
          <div className="rules-column">
            <Typography variant="h6" id="rules-title">
              Obol Exchanges
            </Typography>
            <Typography variant="body1" id="rules-text">
                <p>Seven Unique</p>
                <p>Three Pair</p>
                <p>Four of a Kind</p>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default RulesCard;
