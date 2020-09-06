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
        timerLabel: '',
        start: false,
        pause: false,
    }

    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.countMinutes = this.countMinutes.bind(this);
    this.countSeconds = this.countSeconds.bind(this);
    this.start_stop = this.start_stop.bind(this);

  }

  sessionIncrement = () =>{
    this.setState({
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
        time: (this.state.sessionTimer > 59) ? '60:00' : this.state.sessionTimer + 1 + ':' + '00',
        minute: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
    });
  }

  sessionDecrement = () =>{
    this.setState({
      sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
      time: (this.state.sessionTimer < 2) ? '01:00' : (this.state.sessionTimer < 11) ? '0'.concat(String(this.state.sessionTimer -1)) + ':' + '00' : this.state.sessionTimer - 1 + ':' + '00',
      minute: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
    });
  }

  breakIncrement = () =>{
    this.setState({
      breakTimer: (this.state.breakTimer > 59) ? 60 : this.state.breakTimer + 1,
    });
  }

  breakDecrement = () =>{
    this.setState({
      breakTimer: (this.state.breakTimer < 2) ? 1 : this.state.breakTimer - 1,
    })
  }

  countMinutes = () =>{
    this.setState({
      minute: (this.state.minute === '00') ? '00' : (this.state.minute < 11) ? '0'.concat(String(this.state.minute -1)) : this.state.minute -1,
      time: this.state.minute + ':' + this.state.second,
    })
  }

  countSeconds = () =>{
    this.setState({
      second: (this.state.second === '00') ? '59' : (this.state.second < 11) ? '0'.concat(String(this.state.second -1)) : this.state.second -1,
      time: this.state.minute + ':' + this.state.second,
    })
  }

  start_stop = () =>{
    if(this.state.pause){
      startMinute = setInterval(this.countMinutes, 60 * 1000);
      startSecond = setInterval(this.countSeconds, 1 * 1000);
      this.setState({
        pause: false,
        timerLabel: 'Started',
      })
    }else{
    if(this.state.start){
      clearInterval(startMinute);
      clearInterval(startSecond);
      this.setState({
        time: this.state.time,
        timerLabel: 'Paused',
        minute: this.state.minute,
        second: this.state.second,
        pause: true,
      })
    }else{
    startMinute = setInterval(this.countMinutes, 60 * 1000);
    startSecond = setInterval(this.countSeconds, 1 * 1000);
    this.setState({
      start: true,
      timerLabel: 'Started',
    })
    }
   }
  }

  reset = () =>{
    clearInterval(startMinute);
    clearInterval(startSecond);
    this.setState({
      sessionTimer: 25,
      breakTimer: 5,
      time: '25:00',
      timerLabel: '',
      minute: '25',
      second: '00',
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
      <Timer time_left={this.state.time} time_label={this.state.timerLabel} reset={this.reset} start_stop={this.start_stop}/>
      <footer>
        <h3>Web Design and Development</h3>
        <h3>by Scott Clingan 2020</h3>
      </footer>
    </div>
  );
 }
}

export default Pomodoro;
