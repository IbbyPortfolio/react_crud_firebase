import * as types from './actionTypes';

const initialState = {
   contacts: {},
   loading: false,
   error: null,
};

const contactReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.GET_CONTACTS_START:
         return {
            ...state,
            loading: true,
         };
      case types.GET_CONTACTS_SUCESS:
         return {
            ...state,
            loading: false,
            contacts: action.payload,
         };
      case types.GET_CONTACTS_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default contactReducer;
