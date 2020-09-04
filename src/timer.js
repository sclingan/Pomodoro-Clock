import React from 'react';

const Timer = () =>{
    return(
        <div className="timer">
            <div id="timer-label">
                
                <div id="clock">
                    <input type="text" id="time_left"  placeholder="00:00"></input>
                    <button id="start_stop">Start/Stop</button>
                    <button id="reset">Reset</button>
                </div>
            </div>

        </div>
    );
};

export default Timer;