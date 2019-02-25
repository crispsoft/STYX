import React from "react";
import "./style.css";


import { favorColorsMap } from './../../constants/colors';


function ConditionalObols (props) {
    const type = props.type;

    // need to use map to do colors??
    switch (type) {
        case "1-all":
           return( 
           <div>
                <div className="one-allContainer">
                    <div className="one-all" color={favorColorsMap[1]}/>
                    <div className="one-all" color={favorColorsMap[2]}/>
                    <div className="one-all" color={favorColorsMap[0]}/>
                    <div className="one-all" color={favorColorsMap[3]}/>
                </div>
                <div className="one-allContainer">
                    <div className="one-all" color={favorColorsMap[4]}/>
                    <div className="one-all" color={favorColorsMap[5]}/>
                    <div className="one-all" color={favorColorsMap[6]}/>
                </div>
            </div>
            
           );

        case "3-pair":
           return( 
           <div>
                <div className="three-pairContainer">
                    <div className="three-pair" color={favorColorsMap[0]}/>
                    <div className="three-pair" color={favorColorsMap[1]}/>
                    <div className="three-pair" color={favorColorsMap[2]}/>
                </div>
                <div className="three-pairContainer">
                    <div className="three-pair" color={favorColorsMap[0]}/>
                    <div className="three-pair" color={favorColorsMap[1]}/>
                    <div className="three-pair" color={favorColorsMap[2]}/>
                </div>

            </div>
           );

        case "4-kind":
           return (
            <div>
                <div className="four-kindContainer">
                    <div className="four-kind" color={favorColorsMap[0]}/>
                    <div className="four-kind" color={favorColorsMap[0]}/>
                </div>
                
                <div className="four-kindContainer">
                    <div className="four-kind" color={favorColorsMap[0]}/>
                    <div className="four-kind" color={favorColorsMap[0]}/>    
                </div>
            
            </div>
           );

        default: 
       
    }

}

export default ConditionalObols;
