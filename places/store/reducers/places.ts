import { ADD_PLACE, SET_PLACES } from '../actions/places'
import Place from '../../models/Place';

const initialState = {
  places: []
}

type State = typeof initialState;

const placesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.imageURI)
      return {
        places: [newPlace, ...state.places],
      }
    case SET_PLACES:
      return {
        places: action.places.map(pl=>new Place(pl.id.toString(), ...pl))
      }
    default:
      return state;
  }
}

export default placesReducer;
