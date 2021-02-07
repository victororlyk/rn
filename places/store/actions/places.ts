import * as FileSystem from 'expo-file-system';

import { fetchPlaces, insertPlace } from '../../helpers/db'

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title: string, imageURI: string) => {
  return async dispatch => {
    const fileName = imageURI.split('/')
                             .pop()
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: imageURI,
        to: newPath
      })
      const dbResult = await insertPlace(title, imageURI, 'Dummy', 15.4, 12.5)
      console.log(dbResult, 'here db')
      dispatch({
        type: ADD_PLACE, placeData: { id: dbResult.insertId, title, imageURI: newPath }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const placesDb = await fetchPlaces()
      dispatch({ type: SET_PLACES, places: placesDb.rows._array })
    } catch (error) {
      throw error;
      console.log(error)
    }
  }
}
