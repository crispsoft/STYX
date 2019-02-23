import React from "react";
import PropTypes from "prop-types";
import style from "./style.css";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

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

class RulesCard extends React.Component {
  render() {
    const { classes } = this.props;
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
                <p>Exchange: Turn in your Beast Favors for Obols (points).</p>
                <p>Place Tile: End your turn by placing a River Tile.</p>
            </Typography>
          </div>
          <div className="rules-column">
            <Typography variant="h6" id="rules-title">
              Obol Exchange
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
