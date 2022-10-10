import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  indexHandler = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex flex-items justify-evenly">
        <img
          src={images[active]}
          alt="animal"
          className="w-80 h-80 rounded-full pl-1"
        />
        <div>
          {images.map((photo, index) => (
            <img
              onClick={this.indexHandler}
              key={photo}
              src={photo}
              data-index={index}
              // {index === active ? "active" : ""}
              className="w-48 h-48 inline-block m-5 cursor-pointer rounded-full"
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
