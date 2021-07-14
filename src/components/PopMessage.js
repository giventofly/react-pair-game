import React from "react";
import "../styles/popmessage.scss";

class PopMessage extends React.Component {
  state = {
    time: this.props.time,
    level: this.props.level || 1,
    interval: null,
  };
  
  componentDidMount(){
    let interval = setInterval(() => {
      if(this.state.time > 0){
        this.setState({time: this.state.time - 1});
      }
    }, 1000);
    this.setState({interval});
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  render() {
    return (
      <div className="popmessage">
        <div className="level">Level {this.state.level}</div>
        <div className="time">{this.state.time}</div>
      </div>
    );
  }
}

export default PopMessage;
