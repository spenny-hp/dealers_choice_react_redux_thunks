import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";

const GET_PHOTOS = "GET_PHOTOS";

const photoReducer = (state = [], action) => {
  switch (action) {
    case GET_PHOTOS:
      return (state = action.photos);
      break;

    default:
      return state;
      break;
  }
  return state;
};

const reducer = combineReducers({
  photos: photoReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

const getPhotos = () => {
  return async (dispatch) => {
    const { data: photos } = await axios.get("/api/photos");
    const action = {
      type: GET_PHOTOS,
      photos,
    };
    dispatch(action);
  };
};

export default store;

export { getPhotos };

window.store = store;
