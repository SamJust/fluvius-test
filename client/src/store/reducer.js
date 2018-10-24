import * as types from './actionTypes';

const initialState = {
  events: [],
  weeks: [],
};

export default (state=initialState, action) => {
  switch(action.type){
    case types.SET_WEEKS: return {
      ...state,
      weeks: action.payload
    }
    case types.SET_TOKEN: return {
      ...state,
      token: action.payload, 
    }
    case types.CREATE_EVENT: return {
      ...state,
      events: [...state.events, action.payload]
    }
    case types.SET_EVENTS: return{
      ...state,
      events: action.payload
    }
    case types.SELECT_EVENT: return{
      ...state,
      selectedEvent: action.payload
    }
    default: return state;
  }
}; 