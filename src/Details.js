import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  /*   constructor(props) {
    super(props);

    this.state = { loading: true };
  } */

  state = { loading: true, showModal: false };

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await response.json();

    this.setState(Object.assign({ loading: false, ...json.pets[0] }));
  }

  toggleModalHandler = () =>
    this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="w-2/3 h-screen bg-cyan-900 rounded-xl pt-5 mx-auto">
        <Carousel images={images} />
        <div className="flex flex-col">
          <h1 className="text-center text-cyan-900 uppercase font-bold">
            {name}
          </h1>
          <h2 className="text-center capitalize text-cyan-900 font-bold pb-3">
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModalHandler}
                className="w-1/5 self-center rounded-lg px-8 py-2 mb-5 text-white hover:opacity-50 border-none font-bold uppercase hover:-translate-y-0.5 transition duration-150"
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="w-1/2 self-center mt-1 p-3 bg-cyan-600 rounded-xl text-black shadow-lg shadow-cyan-400 text-xl">
            {description}
          </p>
          {showModal ? (
            <Modal>
              <div className="flex h-screen justify-center items-center bg-cyan-900 opacity-80 fixed inset-0 z-50 text-white text-xl">
                <div className="bg-cyan-500 rounded-lg p-5 text-black">
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="flex flex-row justify-around">
                    <a href="https://bit.ly/pet-adopt">Yes</a>
                    <button onClick={this.toggleModalHandler}>No</button>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />;
    </ErrorBoundary>
  );
};

export default WrappedDetails;
