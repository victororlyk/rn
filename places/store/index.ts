import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk'

import placesReducer from './reducers/places'


const rootReducer = combineReducers({
  places: placesReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;
