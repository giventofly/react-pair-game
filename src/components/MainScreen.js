import React from "react";
import Highscores from "./Highscores";
import LoadingAssets from "./LoadingAssets";

class MainScreen extends React.Component {
  //change player name up the chain
  changeName = (e) => {
    this.props.setplayerName(e.target.value);
  };

  //load assets

  render() {
    return (
      <React.Fragment>
        <div className="highscore">Highscores</div>
        <Highscores></Highscores>
        <input
          value={this.props.playerName}
          type="text"
          placeholder="your name"
          onChange={this.changeName}
        />
        <LoadingAssets></LoadingAssets>
        <button onClick={() => this.props.playGame()}>Start game</button>
      </React.Fragment>
    );
  }
}

export default MainScreen;
