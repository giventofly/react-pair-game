import React from 'react';
import Card from './Card';


class Pairs extends React.Component {

  startLevel = ()=>{
    
  }
  
  
  componentDidMount(){
    //console.log(this.props) ;

  }

  cards = () => {
    
    return this.props.listOfCards.map((card,i) => {
      return (
        <Card key={i} src={i}></Card>
      );
    });
  };

  render(){
    
    return <div className="cards">{this.cards()}</div>;
  }
}

export default Pairs;