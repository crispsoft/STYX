import React from "react";
import "./style.css";

function AboutCard(props) {
    return(
        <div className="about-card">
            <img alt={props.name} className="about-circle" src={props.img} style={{background: props.color}}/>
            <h3 className="about-title">{props.name}</h3>
            <p className="about-description" style={props.style}>{props.description}</p>
        </div>
    ) 
}

export default AboutCard;