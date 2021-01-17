import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex((meal: any) => meal.id === action.mealId);
      if (existingIndex >= 0) {
        const updatedMeals = [...state.favoriteMeals]
        updatedMeals.splice(existingIndex, 1)
        return { ...state, favoriteMeals: updatedMeals }
      }
      const newMeal = state.meals.find(({ id }: any) => id === action.mealId)
      return { ...state, favoriteMeals: [...state.favoriteMeals, newMeal] }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal: any) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false
        }
        return true
      })
      console.log(filteredMeals, 'here')
      return { ...state, filteredMeals }
    default:
      return state;
  }
};

export default mealsReducer;
