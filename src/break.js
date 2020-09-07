import React from 'react';

const Break = (props) =>{
    return(
        <div className="break">
            <div id="break-label">
                <h1>Break Length:</h1>
                <h3>{props.blength}</h3>
                <div id="break-length">
                    <button id="break-increment" onClick={props.inc}>+</button>
                    <button id="break-decrement" onClick={props.dec}>-</button>
                </div>
            </div>
        </div>
    );
};

export default Break;