import { combineReducers } from 'redux';
import contactReducer from './reducer';

const rootReducer = combineReducers({
   contact: contactReducer,
});

export default rootReducer;
