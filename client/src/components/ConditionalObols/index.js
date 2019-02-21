import React from "react";
import "./style.css";

import App from "../../App";


function ConditionalObols (props) {
    const type = props.type;

    // need to use map to do colors??
    switch (type) {
        case "1-all":
           return( 
           <div>
                <div className="one-allContainer">
                    <div className="one-all" color={App.colorMap[1]}/>
                    <div className="one-all" color={App.colorMap[2]}/>
                    <div className="one-all" color={App.colorMap[0]}/>
                    <div className="one-all" color={App.colorMap[3]}/>
                </div>
                <div className="one-allContainer">
                    <div className="one-all" color={App.colorMap[4]}/>
                    <div className="one-all" color={App.colorMap[5]}/>
                    <div className="one-all" color={App.colorMap[6]}/>
                </div>
            </div>
            
           );

        case "3-pair":
           return( 
           <div>
                <div className="three-pairContainer">
                    <div className="three-pair" color={App.colorMap[0]}/>
                    <div className="three-pair" color={App.colorMap[1]}/>
                    <div className="three-pair" color={App.colorMap[2]}/>
                </div>
                <div className="three-pairContainer">
                    <div className="three-pair" color={App.colorMap[0]}/>
                    <div className="three-pair" color={App.colorMap[1]}/>
                    <div className="three-pair" color={App.colorMap[2]}/>
                </div>

            </div>
           );

        case "4-kind":
           return (
            <div>
                <div className="four-kindContainer">
                    <div className="four-kind" color={App.colorMap[0]}/>
                    <div className="four-kind" color={App.colorMap[0]}/>
                </div>
                
                <div className="four-kindContainer">
                    <div className="four-kind" color={App.colorMap[0]}/>
                    <div className="four-kind" color={App.colorMap[0]}/>    
                </div>
            
            </div>
           );

        default: 
       
    }

}

export default ConditionalObols;
