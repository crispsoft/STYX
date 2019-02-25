import React from "react";
import "./style.css";

function BeastCard(props) {
    return(
        <div className="beast-card">
            <img alt={props.name} className="beast" src={props.img} style={{background: props.color}}/>
            <h3 className="beast-title">{props.name}</h3>
            <p className="beast-description" style={props.style}>{props.description}</p>
        </div>
    ) 
}

export default BeastCard;