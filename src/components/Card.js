import React from "react";

class Card extends React.Component {
  componentDidMount() {
    //console.log(this.props) ;
  }

  wasClicked = () => {
    if(!this.props.active && (!this.props.block || !this.props.demo)) {
      this.props.clicked(this.props.src, this.props.id);
    }
    //this.makeClass(true);
  };

  makeClass = () => {
    let myclass = "card ";
    myclass += this.props.demo ? "show " : "";
    myclass += this.props.block ? "show-block " : "";
    myclass += this.props.active ? "show-active " : "";
    //myclass += active ? "show-active " : "";
    return myclass;
  };

  render() {
    return (
      <div className={this.makeClass()} onClick={() => this.wasClicked()}>
        <div className="card-content">
          <img
            src={`images/${this.props.src}.jpg`}
            alt=""
          />
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
}

export default Card;
