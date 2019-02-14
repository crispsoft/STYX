import React from "react";
import styles from "./style.css";
import App from "../../App";

// class ConditionalObols extends Component () {
//    render() {
function ConditionalObols (props) {
    const type = props.type;

    const obolColor = {
        
    }
   
    
    // need to use map to do colors??
    switch (type) {
        case "1-all":
           return( <div className="one-allContainer">
                <div className="one-all" color={App.colorMap[0]} style={{color: `${App.colorMap[0]}`}}/>
                <div className="one-all" color={App.colorMap[1]}></div>
                <div className="one-all" color={App.colorMap[2]}></div>
                <div className="one-all" color={App.colorMap[3]}></div>
                <div className="one-all" color={App.colorMap[4]}></div>
                <div className="one-all" color={App.colorMap[5]}></div>
                <div className="one-all" color={App.colorMap[6]}></div>
            </div>
           );
        break;

        case "3-pair":
           return( <div className="three-pairContainer">
                <div className="three-pair"></div>
                <div className="three-pair"></div>
                <div className="three-pair"></div>
                <div className="three-pair"></div>
                <div className="three-pair"></div>
                <div className="three-pair"></div>
            </div>
           );
        break;

        case "4-kind":
           return ( <div className="four-kindContainer">
                <div className="four-kind"></div>
                <div className="four-kind"></div>
                <div className="four-kind"></div>
                <div className="four-kind"></div>
            </div>
           );
        break;

        default: 
       
    }

}
// }

export default ConditionalObols;
