import React from 'react';

const Session = (props) =>{
    return(
        <div className="session">
            <div id="session-label">
                <h1>Session Length:</h1>
                <h3 id="session-length">{props.slength}</h3>
                <div className="session-length">
                    <button id="session-increment" onClick={props.inc}>+</button>
                    <button id="session-decrement" onClick={props.dec}>-</button><br/>
                    <span>{props.warning}</span>
                </div>
            </div>
        </div>
    );
};

export default Session;