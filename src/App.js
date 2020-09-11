import React from 'react';
import './styles/pomodoro.css';
import Session from './session';
import Break from './break';
import Timer from './timer';

let startMinute;                                     // initialize variables to use for starting/stopping Intervals/Timeouts
let startSecond;                                     // initialize variables to use for starting/stopping Intervals/Timeouts
let secondsOffSet;                                   // initialize variables to user for pause/restart offsets
let delay;
let pausedMinutes;


class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sessionTimer: 25,                            // use to set this.state.minute for countMinute
        breakTimer: 5,                               // use to set this.state.minute for countMinute
        minute: '25',                                // use for this.countMinutes
        second: '00',                                  // use for this.countSeconds
        session: true,                               // set initial session
        break: false,                                // set initial break to false
        label: 'Session',                            // alert user whether 'Session' or 'Break'
        labelAction: 'Session',
        start: false,                                // determine if timer has started 
        pause: false,                                // determine if timer has been paused
        end: '',                                     // use to alert user that session/break has ended
        warning: '',                                 // alert user to pause or reset to adjust session or break timers
        warn: false,                                 // clear/start this.state.warnings
    }
    
    this.sessionIncrement = this.sessionIncrement.bind(this);         // bind all functions to 'this'
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.countMinutes = this.countMinutes.bind(this);
    this.countSeconds = this.countSeconds.bind(this);
    this.start_stop = this.start_stop.bind(this);
    this.counterEnd = this.counterEnd.bind(this);
    this.delayMinutes = this.delayMinutes.bind(this);

  }    
       // bug in sessionIncrement, if incremented after decrement displays 010:00 and 011:00
  sessionIncrement = () =>{                         // increment session timer
    if(this.state.warn){                           // if timer is running , instruct user to pause or reset before adjusting session
         this.setState({
           warning: 'Please press start/stop or reset to change',
         })
    }else{
      if(this.state.break){                        // if break timer is paused, adjust session but not this.state.minute
        this.setState({          
           sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,        
        });
    }else{                                      
      this.setState({                              // if session is paused, adjust sessionTimer
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
        minute: (this.state.sessionTimer > 59) ? '60' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer +1)) : this.state.sessionTimer + 1,
    });
    }
   }
  }

  sessionDecrement = () =>{  
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
      if(this.state.break){
        this.setState({
          sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
        });
      }else{
    this.setState({           
      sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,         
      minute: (this.state.sessionTimer < 2) ? '01' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) : this.state.sessionTimer - 1,
    });
    }
   }
  }

  breakIncrement = () =>{  
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
    this.setState({
      breakTimer: (this.state.breakTimer > 59) ? 60 : this.state.breakTimer + 1,
    });
   }
  }

  breakDecrement = () =>{  
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
    this.setState({
      breakTimer: (this.state.breakTimer < 2) ? 1 : this.state.breakTimer - 1,
    })
   }
  }

  countMinutes = () =>{
    this.setState({                                                                                  
      minute: (this.state.minute <= '00') ? 'clear' : (this.state.minute < 11) ? '0'.concat(String(this.state.minute -1)) : this.state.minute -1,
    })
    if(this.state.minute === 'clear'){
      this.counterEnd();
    }
  }

  countSeconds = () =>{
    this.setState({
      second: (this.state.second === '00') ? '59' : (this.state.second < 11) ? '0'.concat(String(this.state.second -1)) : this.state.second -1,
    })
    if(this.state.second === 'clear'){
      this.counterEnd();
    }
  }

  start_stop = () =>{     
    if(this.state.pause){                                         // timer restarted after pause
       secondsOffSet = 60 - this.state.second;                   // get the difference between current this.second and this.second when timer restarts
       delay = setTimeout(this.countMinutes, (61 -  secondsOffSet) * 1000); 
       startSecond = setInterval(this.countSeconds, 1 * 1000);
       pausedMinutes = setTimeout(this.delayMinutes, (61 - secondsOffSet) * 1000);
      this.setState({
        pause: false,
        labelAction: this.state.label + ' Started',
        warning: '',
        warn: true,
      });
    }else{
      if(this.state.start){   
          clearTimeout(delay);
          clearTimeout(pausedMinutes);                                    // pause function
          clearInterval(startMinute);
          clearInterval(startSecond);
          this.setState({
            labelAction: this.state.label + ' Paused',
            pause: true,
            warning: '',
            warn: false,
          })
      }else{                                                     // start timer
        startMinute = setInterval(this.countMinutes, 60 * 1000);  
        startSecond = setInterval(this.countSeconds, 1 * 1000);
        this.setState({                                                                                            
          minute: (this.state.session) ? (this.state.sessionTimer -1 < 10) ? '0'.concat(String(this.state.sessionTimer -1)) : this.state.sessionTimer -1  : (this.state.breakTimer -1 < 10) ? '0'.concat(String(this.state.breakTimer -1)) : this.breakTimer -1,
          second: 59,
          start: true,
          labelAction: this.state.label + ' Started',
          warn: true,
        })
      }
    }
  }

  counterEnd = () =>{
    clearTimeout(delay);
    clearTimeout(pausedMinutes);
    clearInterval(startSecond);
    clearInterval(startMinute);
    this.setState({
      sessiontimer: this.state.sessionTimer,
      breakTimer: this.state.breakTimer,                  
      minute: (this.state.session) ? (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer)) : this.state.breakTimer : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer)) : this.state.sessionTimer,    
      second:  '00',                       
      session: (this.state.session) ? false : true,
      break: (this.state.break) ? false : true,
      label: (this.state.session) ? 'Break': 'Session',   
      labelAction: (this.state.session) ? 'Break' : 'Session',
      start: false,
      pause: false,
      end: this.state.label + ' has Ended',
    })
   this.start_stop() 
  }

  reset = () =>{
    clearTimeout(delay);
    clearTimeout(pausedMinutes);
    clearInterval(startMinute);
    clearInterval(startSecond);
    this.setState({
      sessionTimer: 25,
      breakTimer: 5,
      minute: '25',
      second: '00',
      session: true,
      break: false,
      label: (this.state.session) ? 'Session' : 'Break',
      labelAction: 'Session',
      start: false,
      pause: false,
      warning: '',
      warn: false,
      end: '',
    })
  }

  delayMinutes = () =>{
       startMinute = setInterval(this.countMinutes, 60 * 1000);
       console.log('function called');
  }

  render(){
  return (
    <div className="pomodoro">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <Session slength={this.state.sessionTimer} inc={this.sessionIncrement} dec={this.sessionDecrement} warning={this.state.warning}/>
      <Break blength={this.state.breakTimer} inc={this.breakIncrement} dec={this.breakDecrement} warning={this.state.warning}/>
      <Timer minute={this.state.minute} second={this.state.second} time_label={this.state.labelAction} reset={this.reset} start_stop={this.start_stop} end={this.state.end}/>
      <footer>
        <h3>Web Design and Development</h3>
        <h3>by Scott Clingan 2020</h3>
      </footer>
    </div>
  );
 }
}

export default Pomodoro;
