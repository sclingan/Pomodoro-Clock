import React from 'react';

const Break = (props) =>{
    return(
        <div className="break">
            <div id="break-label">
                <h1>Break Length:</h1>
                <div id="break-length">
                    {props.blength}
                    <button id="break-increment" onClick={props.inc}>+</button>
                    <button id="break-decrement" onClick={props.dec}>-</button>
                </div>
            </div>

        </div>
    );
};

export default Break;