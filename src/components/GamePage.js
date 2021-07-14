import React from "react";
import "../styles/game.scss";
import Card from "./Card.js";
import PopMessage from "./PopMessage";

class GamePage extends React.Component {
  state = {
    level: 0,
    points: 0,
    time: 0,
    errors: 0,
    listOfCards: [],
    perfect: 1,
    demoMode: true,
    demoTime: 9,
    activeKey: [],
    activeType: [],
    matched: [],
    gameEnd: false,
  };

  nextLevel = () => {
    /*

    */
    this.setState({
      level: this.state.level + 1,
      points: this.calculatePoints(),
      time: this.calculateTime(),
      errors: 0,
      perfect: 1,
      listOfCards: this.makeListOfCards(),
      demoMode: true,
      demoTime: Math.max(4, Math.ceil(this.state.demoTime - this.state.level * 0.1)),
      matched: [],
    });
  };

  calculatePoints = () => {
    return (
      this.state.points +
      this.state.level * this.state.time +
      this.state.level * 100 * this.state.perfect
    );
  };

  calculateTime = () => {
    return Math.max(600 - parseInt(Math.ceil(this.state.level * 0.05 * 600)), 30);
  };

  makeListOfCards = () => {
    //let maxCards = Math.min(Math.max(8, 2 * this.state.level), 28);
    let maxCards = 8;
    if(this.state.level >4){
      maxCards=10;
    }
    if(this.state.level >8){
      maxCards=12;
    }
    if(this.state.level >12){
      maxCards=15;
    }
    let items = [...Array(maxCards).keys(), ...Array(maxCards).keys()];
    this.shuffleArray(items);
    return items;
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  stopGame = () => {
    clearInterval(this.interval);
    //save results
    if (this.props.playerName && this.state.points) {
      this.insertHighscore({
        name: this.props.playerName,
        level: this.state.level,
        points: this.calculatePoints(),
      });
    }
    /*
    this.setState({
      level: 0,
      points: 0,
      time: 0,
      errors: 0,
      listOfCards: [],
      demoMode: true,
      demoTime: 9,
      activeKey: [],
      activeType: [],
      matched: [],
    });
    */
    //exit screen
    this.props.stopGame();
  };

  //start countdown timer
  startLevel = () => {
    this.nextLevel();
    //end demo mode
    setTimeout(() => {
      this.setState({
        demoMode: false,
      });
    }, this.state.demoTime * 1000);
    //

  };
  //calculate next level

  //insert new score
  insertHighscore = (score, max = 20) => {
    let highscores = JSON.parse(localStorage.getItem("scoresList")) || [];
    let scoresList = [...highscores, score]
      //sort DESC level
      .sort((a, b) =>
        parseInt(a.level) > parseInt(b.level)
          ? -1
          : parseInt(b.level) > parseInt(a.level)
          ? 1
          : 0
      )
      //sort DESC points
      .sort((a, b) =>
        parseInt(a.points) > parseInt(b.points)
          ? -1
          : parseInt(b.points) > parseInt(a.points)
          ? 1
          : 0
      )
      .slice(0, max);
    localStorage.setItem("scoresList", JSON.stringify(scoresList));
  };

  componentDidMount() {
    this.startLevel();
    this.interval = setInterval(() => {
      if (this.state.time > 0 && !this.state.gameEnd) {
        this.setState({ time: this.state.time - 1 });
      } else {
        this.stopGame();
      }
    }, 1000);
    //this.insertHighscore({ name: "zeto", points: 4150, level: 6});
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  //catch card clicks
  clicked = (type, key) => {
    if(this.state.demoMode){ return false;}
    //console.log(type,key,this.state.activeKey,this.state.activeType,this.state.matched);
    //*** deal with clicked card logic

    //nothing open
    if (this.state.activeKey.length === 0) {
      let newActiveType = [...this.state.activeType, type];
      let newActiveKey = [...this.state.activeKey, key];
      this.setState({ activeType: newActiveType, activeKey: newActiveKey });
    }
    //one is open
    else {
      //equals, close pair
      if (this.state.activeKey.length < 2 && this.state.activeType.includes(type)) {
        let newMatch = [...this.state.matched, type];
        this.setState({ matched: newMatch, activeKey: [], activeType: [] });
        //end level?
        if (newMatch.length * 2 == this.state.listOfCards.length) {
          this.startLevel();
          //console.log("LEVEL FINISHED");
        }
      }
      //reset active if not
      else {
        let newActiveType = [...this.state.activeType, type];
        let newActiveKey = [...this.state.activeKey, key];
        let newPoints = Math.max(this.state.points - 10, 0);
        this.setState({
          activeType: newActiveType,
          activeKey: newActiveKey,
          points: newPoints,
          perfect: 0,
        });
        setTimeout(() => {
          this.setState({ activeKey: [], activeType: [] });
        }, 500);
      }
    }
    //console.log("EXIT",type,key,this.state.activeKey,this.state.activeType,this.state.matched);
  };

  //create cards
  cards = () => {
    return this.state.listOfCards.map((card, i) => {
      return (
        <Card
          key={i}
          src={card}
          type={card}
          id={i}
          clicked={this.clicked}
          block={this.state.matched.includes(card)}
          demo={this.state.demoMode}
          active={this.state.activeKey.includes(i)}
        ></Card>
      );
    });
  };

  popMessage = () => {
    if (this.state.demoMode) {
      return (
        <PopMessage level={this.state.level} time={this.state.demoTime}></PopMessage>
      );
    }
    return "";
  };

  //

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <div className="scores">
            <div className="name">{this.props.playerName}</div>
            <div className="points">
              {this.state.points}
              <span>points</span>
            </div>
            <div className="level">
              {this.state.level}
              <span>level</span>
            </div>
          </div>
          {this.popMessage()}
          <div className="timeleft">
            <span>time left</span>
            {this.state.time}
            <span>s</span>
          </div>
          <button className="btn" onClick={() => this.stopGame()}>
            Exit
          </button>
        </div>
        <div className={`cards line-${this.state.listOfCards.length / 2}`}>{this.cards()}</div>
      </React.Fragment>
    );
  }
}

export default GamePage;
