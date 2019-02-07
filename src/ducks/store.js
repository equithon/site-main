import { createStore } from 'redux';
import appReducer from './reducers';

const initialState = {}
const appStore = createStore(appReducer, initialState);

export default appStore;
