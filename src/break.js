import React from 'react';


// Display and adjust break timers
const Break = (props) =>{
    return(
        <div className="break">
            <div id="break-label">
                <h1>Break Length:</h1>
                <div className="break-length">
                    <h3 id="break-length">{props.blength}</h3>
                    <button id="break-increment" onClick={props.inc}>+</button>
                    <button id="break-decrement" onClick={props.dec}>-</button><br/>
                    <span>{props.warning}</span>
                </div>
            </div>
        </div>
    );
};

export default Break;