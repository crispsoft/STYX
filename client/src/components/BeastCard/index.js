import React from "react";
import "./style.css";

function BeastCard(props) {
    return(
        <div className="beast-card">
            <img className="beast" src={props.img} style={{background: props.color}}/>
            <h3 className="beast-title">{props.name}</h3>
            <p className="beast-description">{props.description}</p>
        </div>
    ) 
}

export default BeastCard;