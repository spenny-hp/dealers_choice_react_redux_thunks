import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { getPhotos } from "./store";

const _Photos = ({ photos }) => {
  return photos.map((photo) => {
    return (
      <div key={photo.id}>
        <img src={photo.imageLink} alt={photo.name}></img>
        {photo.name}
      </div>
    );
  });
};

// get state
const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

// set state
const mapDispatchToProps = (dispatch) => {
  return {
    getPhotos: () => dispatch(getPhotos()),
  };
};

const Photos = connect(mapStateToProps, mapDispatchToProps)(_Photos);

class _App extends Component {
  componentDidMount() {
    this.props.getPhotos();
  }
  render() {
    const { photos } = this.props;
    return (
      <div>
        <h1>My Photos</h1>

        <Photos />
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
