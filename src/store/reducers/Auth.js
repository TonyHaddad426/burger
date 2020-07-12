// the purpose of this reducer is to store the user token

// WHEN YOU CREATE A REDUCER MAKE SURE TO IMPORT IT TO THE MAIN INDEX.JS FILE
import * as actionTypes from "../actions/actionsTypes";


const initialState = {
  token: null,
  userId: null,
  error: false,
  loading: false, 
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
      case actionTypes.AUTH_SUCCESS:
      return{
          ...state, 
          token: action.idToken,
          userId: action.userId,
          error: null,
          loading: false
      };
      case actionTypes.AUTH_FAIL:
      return{
          ...state, 
          error: action.error,
          loading: false
      }; 

      case actionTypes.AUTH_LOGOUT: 
      return {
          ...state, 
          token: null,
          userId: null
      }

      case actionTypes.SET_AUTH_REDIRECT_PATH:
      return{
        ...state, 
        authRedirectPath: action.path
      }

    default:
      return state;
  }
};

export default reducer;
