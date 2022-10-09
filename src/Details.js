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
      <div className="mx-auto p-4">
        <Carousel images={images} />
        <div className="flex flex-col h-screen">
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
                className="w-1/5 self-center rounded-lg px-6 py-2 text-white hover:opacity-50 border-none font-bold uppercase"
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="w-1/2 self-center mt-1 px-3 py-1 bg-cyan-900 rounded-xl text-white shadow-lg shadow-cyan-800 text-sm">
            {description}
          </p>
          {showModal ? (
            <Modal>
              <div className="bg-cyan-900 opacity-80 fixed inset-0 z-50 flex h-screen justify-center items-center text-white text-xl">
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModalHandler}>No</button>
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
