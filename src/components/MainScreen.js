import React from "react";
import Highscores from "./Highscores";
import LoadingAssets from "./LoadingAssets";
import "../styles/main.scss";

class MainScreen extends React.Component {
  //change player name up the chain
  changeName = (e) => {
    this.props.setplayerName(e.target.value);
  };

  //load assets

  render() {
    return (
      <div className="f-center">
        <div className="highscore">Highscores</div>
        <Highscores></Highscores>
        <div className="start-block">
          <input
            value={this.props.playerName}
            type="text"
            placeholder="your name"
            onChange={this.changeName}
            />
          <LoadingAssets></LoadingAssets>
          <button onClick={() => this.props.playGame()}>Start game</button>
        </div>
      </div>
    );
  }
}

export default MainScreen;
