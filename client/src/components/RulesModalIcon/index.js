// import React from "react";
// import style from "./style.css";
// import Modal from '@material-ui/core/Modal';
// import RulesCard from "../RulesCard"

// class RulesModalIcon extends React.Component {
//     state = {
//         open: false,
//       };
    
//       handleOpen = () => {
//         this.setState({ open: true });
//       };
    
//       handleClose = () => {
//         this.setState({ open: false });
//       };

//       render () {
//           const {classes} = this.props;
//           return (
//               <div>
//                   {/* <img className="info-icon" src="" /> */}
//               <Modal open={false}>
//               <span>Somthing</span>
//                       {/* <RulesCard /> */}
//                       <div className="rulescard">rules</div>
//               </Modal>
//               </div>
//           )

//       };


// }

// export default RulesModalIcon;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import RulesCard from "../RulesCard"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <img className="info-icon" src="/assets/info-icon.png" onClick={this.handleOpen}/>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        <RulesCard />
        
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const RulesModalIcon = withStyles(styles)(SimpleModal);

export default RulesModalIcon;