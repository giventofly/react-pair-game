import React from "react";
import MainScreen from "./MainScreen.js";
import GamePage from "./GamePage.js";

class App extends React.Component {
  state = {
    playing: false,
  
    playerName: "",
  };

  setPlayerName = (name) => {
    this.setState({ playerName: name });
    localStorage.setItem("playername", JSON.stringify(name));
  };

  toggleGame = () => {
    this.setState({ playing: !this.state.playing });
    //on exit reset level
    /*
    if (this.state.playing) {
      this.setState({ level: 0, points: 0, time: 0,errors:0 });
    }*/
  };

  componentDidMount() {
    let name = JSON.parse(localStorage.getItem("playername")) || "";
    this.setPlayerName(name);
  }

  showMyComponent = () => {
    if (this.state.playing) {
      return (
        <GamePage
          stopGame={this.toggleGame}
          playerName={this.state.playerName}
        ></GamePage>
      );
    }
    return (
      <MainScreen
        playGame={this.toggleGame}
        playerName={this.state.playerName}
        setplayerName={this.setPlayerName}
      ></MainScreen>
    );
  };

  render() {
    return <div className="content">{this.showMyComponent()}</div>;
  }
}

export default App;
