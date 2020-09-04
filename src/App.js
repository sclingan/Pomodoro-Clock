import React from 'react';
import './styles/pomodoro.css';
import Session from './session';
import Break from './break';
import Timer from './timer';

let sessionLength = 25;
let breakLength = 5;

class Pomodoro extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sessionTimer: sessionLength,
        breakTimer: breakLength,
    }

  }

  render(){
  return (
    <div className="pomodoro">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <Session slength={sessionLength}/>
      <Break blength={breakLength}/>
      <Timer/>
      <footer>
        <h3>Web Design and Development</h3>
        <h3>by Scott Clingan 2020</h3>
      </footer>
    </div>
  );
 }
}

export default Pomodoro;
