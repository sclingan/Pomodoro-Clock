import React from 'react';
import './styles/pomodoro.css';
import Session from './session';
import Break from './break';
import Timer from './timer';

 // initialize variables to use for starting/stopping Intervals/Timeouts
let startMinute;                                                                                    
let startSecond;                                                                                     
let secondsOffSet;                                                                                   
let delay;
let pausedMinutes;



class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sessionTimer: 25,                                                                          
        breakTimer: 5,                                                                               
        minute: '25',                                                                                
        second: '00',                                                                                
        session: true,                                                                               
        break: false,                                                                               
        label: 'Session',                                                                            
        labelAction: 'Session',                                                                      
        start: false,                                                                                
        pause: false,                                                                                
        end: '',                                                                                     
        warning: '',                                                                                 
        warn: false,                                                                                 
    }

     // bind all functions to 'this'
    this.sessionIncrement = this.sessionIncrement.bind(this);                                        
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.countMinutes = this.countMinutes.bind(this);
    this.countSeconds = this.countSeconds.bind(this);
    this.start_stop = this.start_stop.bind(this);
    this.counterEnd = this.counterEnd.bind(this);
    this.delayMinutes = this.delayMinutes.bind(this);
    this.beep = this.beep.bind(this);

  }                           
  
  // Increment Session timer
  sessionIncrement = () =>{
    //If timer is running, instruct user to pause or reset before adjusting session                                                                          
    if(this.state.warn){                                                                           
         this.setState({
           warning: 'Please press start/stop or reset to change',
         })
    }else{
      // If break timer is paused, adjust session but not this.state.minute
      if(this.state.break){                                                                       
        this.setState({          
           sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,    
        });
    }else{  
      // If session is paused, ajust sessionTimer                                    
      this.setState({                                                                              
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,    
        minute: (this.state.sessionTimer > 59) ? '60' : (this.state.sessionTimer < 9 ) ? '0'.concat(String(this.state.sessionTimer +1)) : this.state.sessionTimer + 1, 
      });
    }
   }
  }
  
  // Decrement Session timer
  sessionDecrement = () =>{  
    //If timer is running, instruct user to pause or reset before adjusting session   
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
      // If break timer is paused, adjust session but not this.state.minute
      if(this.state.break){
        this.setState({
          sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,  
        });
    }else{
      // If session is paused, ajust sessionTimer 
      this.setState({           
        sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,   
        minute: (this.state.sessionTimer < 2) ? '01' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) : this.state.sessionTimer - 1, 
      });
    }
   }
  }
  
  // Increment Break timer
  breakIncrement = () =>{ 
    //If timer is running, instruct user to pause or reset before adjusting break 
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
      // If session timer is paused, adjust break but not this.state.minute
      if(this.state.session){
        this.setState({
        breakTimer: (this.state.breakTimer > 59) ? 60 : this.state.breakTimer + 1, 
      });
    }else{
     // If break is paused, ajust breakTimer
     this.setState({
       breakTimer: (this.state.breakTimer > 59) ? 60 : this.state.breakTimer + 1,    
       minute: (this.state.breakTimer > 59) ? '60' : (this.state.breakTimer < 9 ) ? '0'.concat(String(this.state.breakTimer +1)) : this.state.breakTimer + 1, 
      });
    }
   }
  }
  
  // Decrement Break timer
  breakDecrement = () =>{  
    //If timer is running, instruct user to pause or reset before adjusting break 
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
      // If session timer is paused, adjust break but not this.state.minute
      if(this.state.session){
        this.setState({
        breakTimer: (this.state.breakTimer < 2) ? 1 : this.state.breakTimer - 1,   
      })
    }else{
     // If break is paused, ajust breakTimer
     this.setState({
       breakTimer: (this.state.breakTimer < 2) ? 1 : this.state.breakTimer -1,
       minute: (this.state.breakTimer < 2) ? '01' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer -1)) : this.state.breakTimer -1,
      })
    }
   }
  }
  
  // Decrement this.state.minute by 1 
  countMinutes = () =>{
    // If this.state.minute is under 10 add a leading 0, when this.state.minute reaches '00' stop
    this.setState({                                                                                  
      minute: (this.state.minute <= '00') ? 'clear' : (this.state.minute < 11) ? '0'.concat(String(this.state.minute -1)) : this.state.minute -1, 
    })
    // When counter stops call counterEnd to handle 
    if(this.state.minute === 'clear'){
      this.counterEnd();  
    }
  }
  
  // Decrement this.state.second by 1
  countSeconds = () =>{
    // If this.state.second is under 10 add a leading 0, when this.state.second reaches '00' reset to '59'
    this.setState({
      second: (this.state.second === '00') ? '59' : (this.state.second < 11) ? '0'.concat(String(this.state.second -1)) : this.state.second -1, 
    });
  }

  start_stop = () =>{    
    // Restart timer after pause
    if(this.state.pause){  
       // Get the difference between current this.second and this.second when timer restarts                                                                          
       secondsOffSet = 60 - this.state.second;  
       // Account for difference between timer when paused and then restarted                                                 
       delay = setTimeout(this.countMinutes, (61 -  secondsOffSet) * 1000); 
       // Restart timers
       startSecond = setInterval(this.countSeconds, 1 * 1000);
       pausedMinutes = setTimeout(this.delayMinutes, (61 - secondsOffSet) * 1000);
      this.setState({
        pause: false,
        labelAction: this.state.label + ' Started',
        warning: '',
        warn: true,
      });
    }else{
      // Pause timer
      if(this.state.start){   
          clearTimeout(delay);
          clearTimeout(pausedMinutes);                                                        
          clearInterval(startMinute);
          clearInterval(startSecond);
          this.setState({
            labelAction: this.state.label + ' Paused',
            pause: true,
            warning: '',
            warn: false,
          })
      }else{    
        // Start timer                                                                              
        startMinute = setInterval(this.countMinutes, 60 * 1000);  
        startSecond = setInterval(this.countSeconds, 1 * 1000);
        this.setState({                                                                
          minute: (this.state.session) ? (this.state.sessionTimer -1 < 10) ? '0'.concat(String(this.state.sessionTimer -1 )) : this.state.sessionTimer -1  : (this.state.breakTimer -1 < 10) ? '0'.concat(String(this.state.breakTimer -1 )) : this.state.breakTimer -1, 
          second: '59',   
          start: true,
          labelAction: this.state.label + ' Started',
          warn: true,
        })
      }
    }
  }
  
  // Handle timers when counters end
  counterEnd = () =>{
    clearTimeout(delay);
    clearTimeout(pausedMinutes);
    clearInterval(startSecond);
    clearInterval(startMinute);
    // If break ends, start session or if session ends, start break
    this.setState({
      sessionTimer: this.state.sessionTimer,
      breakTimer: this.state.breakTimer,                                                                           
      minute: (this.state.session) ? (this.state.breakTimer < 11 ) ? '0'.concat(String(this.state.breakTimer)) : this.state.breakTimer : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer)) : this.state.sessionTimer,  
      second:  '00',                       
      session: (this.state.session) ? false : true,
      break: (this.state.break) ? false : true,
      label: (this.state.session) ? 'Break': 'Session',   
      labelAction: (this.state.session) ? 'Break' : 'Session',
      start: false,
      pause: false,
      end: this.state.label + ' has Ended',
    })
   // When timer ends, play sound then restart the next timer
   this.beep()
   this.start_stop()   
  }
  
  // Reset all timers and state
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
    let track = document.getElementsByTagName('audio').beep;
    track.pause();
    track.currentTime = 0;
  }
  
  // Delay timers to account for differences between paused timers
  delayMinutes = () =>{
       startMinute = setInterval(this.countMinutes, 60 * 1000);
  }
  
  // Play a sound when timers expire
  beep = () =>{
    let track = document.getElementsByTagName('audio').beep;
    track.currentTime = 0;
    track.play();
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
