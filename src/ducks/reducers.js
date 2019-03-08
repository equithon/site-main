import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import * as TYPES from "./types";

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.dashboardTypes.UPDATE_DASH: {
      const newState = { ...state };
      newState.greetingInfo = action.info.greetingInfo;
      newState.toastInfo = action.info.toastInfo;
      console.log(newState);
      return newState;
    }

    default:
      return state;
  }
};

const appReducer = combineReducers({
  // Add firebase to reducers
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  dashboard: dashboardReducer
});

export default appReducer;
