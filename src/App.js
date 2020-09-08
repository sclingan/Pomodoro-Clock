import React from 'react';
import './styles/pomodoro.css';
import Session from './session';
import Break from './break';
import Timer from './timer';

let startMinute;
let startSecond;

class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sessionTimer: 25,
        breakTimer: 5,
        time: '25:00',
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

    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.countMinutes = this.countMinutes.bind(this);
    this.countSeconds = this.countSeconds.bind(this);
    this.start_stop = this.start_stop.bind(this);
    this.counterEnd = this.counterEnd.bind(this);

  }                          

  sessionIncrement = () =>{  // if breakTimer is running then paused, sessionDecrement cuasees this.state.time to change breakTimer
    if(this.state.warn){   
         this.setState({
           warning: 'Please press start/stop or reset to change',
         })
    }else{
    this.setState({          
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
        time: (this.state.sessionTimer > 59) ? '60:00' : this.state.sessionTimer + 1 + ':' + '00',  // fix bug here
        minute: (this.state.sessionTimer > 59) ? '60' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer +1)) : this.state.sessionTimer + 1,
    });
   }
  }

  sessionDecrement = () =>{   // if breakTimer is running then paused, sessionDecrement cuasees this.state.time to change breakTimer
    if(this.state.warn){
      this.setState({
        warning: 'Please press start/stop or reset to change',
      })
    }else{
    this.setState({           
      sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
      time: (this.state.sessionTimer < 2) ? '01:00' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) + ':' + '00' : this.state.sessionTimer - 1 + ':' + '00', 
      minute: (this.state.sessionTimer < 2) ? '01' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) : this.state.sessionTimer - 1,
    });
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
      time: this.state.time,
      minute: (this.state.breakTimer > 59) ? '60' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer +1)) : this.state.breakTimer + 1,
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
      time: this.state.time,
      minute: (this.state.breakTimer < 2) ? '01' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer -1)) : this.state.breakTimer - 1,
    })
   }
  }

  countMinutes = () =>{
    this.setState({
      minute: (this.state.minute === '00' && this.state.second === '00') ? 'clear' : (this.state.minute === '00') ? '00' : (this.state.minute < 11) ? '0'.concat(String(this.state.minute -1)) : this.state.minute -1,
      time: this.state.minute + ':' + this.state.second,
    })
    if(this.state.minute === 'clear'){
      this.counterEnd();
    }
  }

  countSeconds = () =>{
    this.setState({
      second: (this.state.minute === '00' && this.state.second === '00') ?  'clear' : (this.state.second === '00') ? '59' : (this.state.second < 11) ? '0'.concat(String(this.state.second -1)) : this.state.second -1,
      time: this.state.minute + ':' + this.state.second,
    })
    if(this.state.second === 'clear'){
      this.counterEnd();
    }
  }

  start_stop = () =>{
    if(this.state.pause){
      startMinute = setInterval(this.countMinutes, 60 * 1000);
      startSecond = setInterval(this.countSeconds, 1 * 1000);
      this.setState({
        pause: false,
        labelAction: this.state.label + ' Started',
        warning: '',
        warn: true,
      })
    }else{
    if(this.state.start){       // add counterresets and timouts to restart this.state.minute, think about how it affects reset and counterEnd!!!
      clearInterval(startMinute);
      clearInterval(startSecond);
      this.setState({
        labelAction: this.state.label + ' Paused',
        pause: true,
        warning: '',
        warn: false,
      })
    }else{
    startMinute = setInterval(this.countMinutes, 60 * 1000);
    startSecond = setInterval(this.countSeconds, 1 * 1000);
    this.setState({     
      start: true,
      labelAction: this.state.label + ' Started',
      warn: true,
    })
    }
   }
  }

  counterEnd = () =>{
    clearInterval(startSecond);
    clearInterval(startMinute);
    this.setState({
      sessiontimer: 25,                    // check this for bugs, should it be this.state.sessionTimer or static???
      breakTimer: this.state.breakTimer,  
      time: (this.state.session) ? (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer)) + ':' + '00' : this.state.breakTimer + ':' + '00' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer)) + ':' + '00' : this.state.sessionTimer + ':' + '00',
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
    clearInterval(startMinute);
    clearInterval(startSecond);
    this.setState({
      sessionTimer: 25,
      breakTimer: 5,
      time: '25:00',
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

  render(){
  return (
    <div className="pomodoro">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <Session slength={this.state.sessionTimer} inc={this.sessionIncrement} dec={this.sessionDecrement} warning={this.state.warning}/>
      <Break blength={this.state.breakTimer} inc={this.breakIncrement} dec={this.breakDecrement} warning={this.state.warning}/>
      <Timer time_left={this.state.time} time_label={this.state.labelAction} reset={this.reset} start_stop={this.start_stop} end={this.state.end}/>
      <footer>
        <h3>Web Design and Development</h3>
        <h3>by Scott Clingan 2020</h3>
      </footer>
    </div>
  );
 }
}

export default Pomodoro;
