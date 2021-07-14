import React from "react";
import "../styles/highscores.scss";

class Highscores extends React.Component {
  state = { highscores: [] };

  componentDidMount() {
    let list = JSON.parse(localStorage.getItem("scoresList")) || [];
    this.setState({
      highscores: list,
    });
  }

  highScoresList = () => {
    return this.state.highscores.map((score,i) => {
      return (
        <li className="player" key={i}>
          <div className="name">{score.name}</div>
          <div className="points">{score.points}<span>points</span></div>
          <div className="level">{score.level ? score.level : 0}<span>level</span></div>
        </li>
      );
    });
  };

  render() {
    return <ul className="highscores">{this.highScoresList()}</ul>;
  }
}

export default Highscores;
