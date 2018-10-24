import * as types from './actionTypes';
import axios from 'axios';

export function Login(creds){
  return async dispatch => {
    try{
      const data = await axios.post('/login', creds);
      window.localStorage.setItem('token', data.data);
      dispatch(setToken(data.data));
      LoadEvents()(dispatch);
    }
    catch(err){
      console.error(err);
    }
  };
};

export function LoadEvents(){
  return async dispatch => {
    const token = window.localStorage.getItem('token');
    dispatch(setToken(token));

    try{
      const response = await axios.get('/events', {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      const events = response.data;
      dispatch(setEvents(events))
    }catch(err){
       console.error(err);      
    }; 
  };
};

export function CreateEvent(event){
  return async (dispatch, getState) => {
    const token= getState().token;
    try{
      const response = await axios.put('/events', event, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(createEvent({ ...event, _id:response.data }))
    } catch(err){
      console.error(err);
    }
  };
};

export function UpdateEvent(event){
  return async (dispatch, getState) => {
    try{
      const state = getState();
      await axios.post('/events', event, {
        headers:{
          Authorization: `Bearer ${state.token}`
        }
      });
      const newEvents = state.events.map(mapEvent => {
        if(mapEvent._id === event._id) return event;
        return mapEvent;
      });

      dispatch(setEvents(newEvents));
    } catch(err){
      console.error(err);
    }
  };
};

export function DeleteEvent(_id){
  return async (dispatch, getState) => {
    try{
      const state = getState();
      await axios.delete(`/events/${_id}`, {
        headers:{
          authorization: `Bearer ${state.token}`
        }
      });

      const newEvents = state.events.filter(event => event._id !== _id);
      dispatch(setEvents(newEvents));
    } catch(err) {

    }
  };
};

export const createEvent = event => ({
  type: types.CREATE_EVENT,
  payload: event
});

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: token
});

export const setDays = days => ({
  type: types.SET_WEEKS,
  payload: days
});

export const setEvents = events => ({
  type: types.SET_EVENTS,
  payload: events
});