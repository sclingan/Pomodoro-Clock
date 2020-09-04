import React from 'react';

const Session = (props) =>{
    return(
        <div className="session">
            <div id="session-label">
                <h1>Session Length:</h1>
                <div id="session-length">
                    {props.slength}
                    <button id="session-increment">+</button>
                    <button id="session-decrement">-</button>
                </div>
            </div>

        </div>
    );
};

export default Session;