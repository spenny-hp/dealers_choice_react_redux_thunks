import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { getPhotos } from "./store";
import axios from "axios";

const _Photos = ({ photos }) => {
  return photos.map((photo) => {
    return (
      <div key={photo.id} className="photo">
        <span>{photo.name}</span>
        <span><img src={photo.imageLink} alt={photo.name}></img></span>
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

class _App extends Component {
  componentDidMount() {
    this.props.getPhotos();
  }
  render() {
    return (
      <div>
        <h1>My Photos</h1>

        <Photos />
      </div>
    );
  }
}

const Photos = connect(mapStateToProps, mapDispatchToProps)(_Photos);
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
