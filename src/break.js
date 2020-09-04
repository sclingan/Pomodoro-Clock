import React from 'react';

const Break = (props) =>{
    return(
        <div className="break">
            <div id="break-label">
                <h1>Break Length:</h1>
                <div id="break-length">
                    {props.blength}
                    <button id="break-increment">+</button>
                    <button id="break-decrement">-</button>
                </div>
            </div>

        </div>
    );
};

export default Break;