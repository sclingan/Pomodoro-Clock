import React from 'react';
import wavBeep from './beep.wav';


// Display and start/stop , reset timers
const Timer = (props) =>{
    return(
        <div className="timer">
            <div id="timer-label">
                <div id="clock">
                    <h1>{props.time_label}</h1>
                    <h1 id="red">{props.end}</h1>
                    <div id="time-left">
                      {props.minute}:{props.second}
                    </div>
                    <button id="start_stop" onClick={props.start_stop}>Start/Stop</button>
                    <button id="reset" onClick={props.reset}>Reset
                        <audio id="beep" src={wavBeep} crossOrigin="anonymous"></audio>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Timer;