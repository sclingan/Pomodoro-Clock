import React from 'react';

const Timer = (props) =>{
    return(
        <div className="timer">
            <div id="timer-label">
                
                <div id="clock">
                    <h1>{props.time_label}</h1>
                    <input type="text" id="time_left" value={props.time_left} placeholder="00:00" disabled></input>
                    <button id="start_stop">Start/Stop</button>
                    <button id="reset">Reset</button>
                </div>
            </div>

        </div>
    );
};

export default Timer;