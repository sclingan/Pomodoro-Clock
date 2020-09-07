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

  sessionIncrement = () =>{   // disable this when timer is running
    this.setState({           // if timer is running , minute is updated but countSecond is wrong
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
        time: (this.state.sessionTimer > 59) ? '60:00' : this.state.sessionTimer + 1 + ':' + '00',
        minute: (this.state.sessionTimer > 59) ? '60' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer +1)) : this.state.sessionTimer + 1,
    });
  }

  sessionDecrement = () =>{    // disable this when timer is running
    this.setState({            // if counter is running , minute is updated but countSecond is wrong
      sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
      time: (this.state.sessionTimer < 2) ? '01:00' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) + ':' + '00' : this.state.sessionTimer - 1 + ':' + '00',
      minute: (this.state.sessionTimer < 2) ? '01' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) : this.state.sessionTimer - 1,
    });
  }

  breakIncrement = () =>{  // disable this when timer is running
    this.setState({
      breakTimer: (this.state.breakTimer > 59) ? 60 : this.state.breakTimer + 1,
      time: (this.state.breakTimer > 59) ? '60:00' : this.state.breakTimer + 1 + ':' + '00',
      minute: (this.state.breakTimer > 59) ? '60' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer +1)) : this.state.breakTimer + 1,
    });
  }

  breakDecrement = () =>{  // disable this when timer is running
    this.setState({
      breakTimer: (this.state.breakTimer < 2) ? 1 : this.state.breakTimer - 1,
      time: (this.state.breakTimer < 2) ? '01:00' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer -1)) + ':' + '00' : this.state.breakTimer - 1 + ':' + '00',
      minute: (this.state.breakTimer < 2) ? '01' : (this.state.breakTimer < 11) ? '0'.concat(String(this.state.breakTimer -1)) : this.state.breakTimer - 1,
    })
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
      })
    }else{
    if(this.state.start){       // add counterresets and timouts to restart this.state.minute
      clearInterval(startMinute);
      clearInterval(startSecond);
      this.setState({
        labelAction: this.state.label + ' Paused',
        pause: true,
      })
    }else{
    startMinute = setInterval(this.countMinutes, 60 * 1000);
    startSecond = setInterval(this.countSeconds, 1 * 1000);
    this.setState({     
      start: true,
      labelAction: this.state.label + ' Started',
    })
    }
   }
  }

  counterEnd = () =>{
    clearInterval(startSecond);
    clearInterval(startMinute);
    this.setState({
      sessiontimer: 25,
      breakTimer: 5,
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
    })
  }

  render(){
  return (
    <div className="pomodoro">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <Session slength={this.state.sessionTimer} inc={this.sessionIncrement} dec={this.sessionDecrement}/>
      <Break blength={this.state.breakTimer} inc={this.breakIncrement} dec={this.breakDecrement}/>
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
