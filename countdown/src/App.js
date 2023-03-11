import React from "react";
import FiveSec from "./Sound/fiveSec.mp3" 
//import { updateConstructSignature } from "typescript";
import "./styles.css";

var Count=1500, 
    isPause =true, 
    isSession =true, 
    sessionCount = 1500, 
    breakCount = 300;

function convertToTime(sec){
  var Min = String(Math.trunc(sec/60));
  var Sec = (sec%60) == 60 ? "00" : String((sec%60));
  Min = Min.length==1 ? "0" + Min : Min
  Sec = Sec.length==1 ? "0" + Sec : Sec;
  var Time = Min + ":" + Sec;
  return Time
}

function UpdateTime(){
  UpdateCount();
  document.getElementById("h1_Count").innerHTML=convertToTime(Count);
}

function getMins(count){
  var Min = String(Math.trunc(count/60));
  Min = Min.length==1 ? "0" + Min : Min
  return Min;
}
function UpdateCount(){
  if(isSession) Count = sessionCount;
  else Count = breakCount;
}
function count(){
  setTimeout(function(){
    if(!isPause){
      if(Count==6){
        var audio = document.getElementById("audio_five");
        audio.currentTime = 0;
        audio.play();
      }
      if(Count==0) {
        isSession = !isSession;
        if(isSession) Count = sessionCount;
        else Count = breakCount;
      }
      else Count--;

      document.getElementById("h1_Count").innerHTML=convertToTime(Count);
      count();
    }
  },1000)
}
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.SessionPlusOne = this.SessionPlusOne.bind(this);
    this.SessionMinusOne = this.SessionMinusOne.bind(this);
    this.BreakPlusOne = this.BreakPlusOne.bind(this);
    this.BreakMinusOne = this.BreakMinusOne.bind(this);
    this.playpause = this.playpause.bind(this);
  }
  SessionPlusOne(){
    if(isSession) sessionCount = Count;
    sessionCount += 60;
    document.getElementById("h1_Mins").innerHTML=getMins(sessionCount);
    UpdateTime();
  }
  SessionMinusOne(){
    if(isSession) sessionCount = Count;
    if(sessionCount<120){
      alert("One minute is the minimum time that can be set.");
      return;
    }
    sessionCount -= 60;
    document.getElementById("h1_Mins").innerHTML=getMins(sessionCount);
    UpdateTime();
  }
  BreakPlusOne(){
    if(!isSession) breakCount= Count;
    breakCount += 60;
    document.getElementById("h1_Secs").innerHTML=getMins(breakCount);
    UpdateTime();
  }
  BreakMinusOne(){
    if(!isSession) breakCount= Count;
    if(breakCount<120){
      alert("One minute is the minimum time that can be set.");
      return;
    }
    breakCount -= 60;
    document.getElementById("h1_Secs").innerHTML=getMins(breakCount);
    UpdateTime();
  }
  playpause(){
    isPause=!isPause;
    if(!isPause) {
      document.getElementById("span_play").innerHTML = "<i class='fa-solid fa-circle-pause'></i>";
      count();
    }
    else document.getElementById("span_play").innerHTML = "<i class='fa-solid fa-circle-play'></i>";
  }
  render(){
    return (
      <div className="Clock">
        <audio
          id="audio_five"
          className="clip"
          src={FiveSec}
        />
        <h1 id="h1_Count">{convertToTime(Count)}</h1>
        <div className="Controls">
          <div>
            <span onClick={this.SessionPlusOne}>
              <i class="fa-solid fa-arrow-up"></i>
            </span>
            <h1 id="h1_Mins">{getMins(sessionCount)}</h1>
            <span onClick={this.SessionMinusOne}>
              <i class="fa-solid fa-arrow-down"></i>
            </span>
          </div>
          <div className="play">
            <span id="span_play" onClick={this.playpause}>
              <i class="fa-solid fa-circle-play"></i>
            </span>
          </div>
          <div>
            <span onClick={this.BreakPlusOne}>
              <i class="fa-solid fa-arrow-up"></i>
            </span>
            <h1 id="h1_Secs">{getMins(breakCount)}</h1>
            <span onClick={this.BreakMinusOne}>
              <i class="fa-solid fa-arrow-down"></i>
            </span>
          </div>
        </div>
        <div className="Creator">
          Created by Jomiel Enriquez
        </div>
      </div>
    );
  }
}
