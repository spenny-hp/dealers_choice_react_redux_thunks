import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { getPhotos } from "./store";

const _Photos = ({ photos }) => {
  return photos.map((photo) => <div key={photo.id}>{photo.name}</div>);
};

// set state
const mapDispatchToProps = (dispatch) => {
  return {
    getPhotos: () => dispatch(getPhotos()),
  };
};

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

const Photos = connect(mapStateToProps, mapDispatchToProps)(_Photos);

class App extends Component {
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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
