import React from "react";
import "../styles/loading.scss";

class LoadingAssets extends React.Component {
  state = {
    imagesLoaded: false,
  };

  imagesList = ()=>{
    let arr = [];
    for (let index = 0; index < 28; index++) {
      arr.push({id:index,url:"images/"+index+".jpg"});
    }
    console.log(arr);
    return arr;
  };

  loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image.url;
      // wait 2 seconds to simulate loading time
      loadImg.onload = () => {
        resolve(image.url);
      };
      loadImg.onerror = (err) => reject(err);
    });
  };


  loadImages = () => {
    Promise.all(this.imagesList().map((image) => this.loadImage(image)))
      .then(() => this.setState({ imagesLoaded: true }))
      .catch((err) => {
        this.setState({ imagesLoaded: true });
        console.log(this.state.imagesLoaded,"Failed to load images", err);
      });
  };

  componentDidMount(){
    this.loadImages();
  }

  render() {
    return (
      
        <div className="images">
          {this.state.imagesLoaded ? (<h5>Images Load, you can start the game</h5>) : (<h5>Pre-loading images....</h5>)}
        </div>

    );
  }
}

export default LoadingAssets;
