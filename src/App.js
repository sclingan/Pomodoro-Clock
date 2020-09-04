import React from 'react';
import './styles/pomodoro.css';
import Session from './session';
import Break from './break';
import Timer from './timer';


class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sessionTimer: 25,
        breakTimer: 5,
        time: '25:00',
        timerLabel: 'Session',
    }

    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);

  }

  sessionIncrement = () =>{
    this.setState({
        sessionTimer: (this.state.sessionTimer > 59) ? 60 : this.state.sessionTimer + 1,
    });
  }

  sessionDecrement = () =>{
    this.setState({
      sessionTimer: (this.state.sessionTimer < 2) ? 1 : this.state.sessionTimer - 1,
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

  render(){
  return (
    <div className="pomodoro">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <Session slength={this.state.sessionTimer} inc={this.sessionIncrement} dec={this.sessionDecrement}/>
      <Break blength={this.state.breakTimer} inc={this.breakIncrement} dec={this.breakDecrement}/>
      <Timer time_left={this.state.time} time_label={this.state.timerLabel}/>
      <footer>
        <h3>Web Design and Development</h3>
        <h3>by Scott Clingan 2020</h3>
      </footer>
    </div>
  );
 }
}

export default Pomodoro;
