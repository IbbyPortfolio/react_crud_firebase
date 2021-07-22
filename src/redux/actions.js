import * as types from './actionTypes';
import { db } from '../firebase';

const getContactsStart = () => ({
   type: types.GET_CONTACTS_START,
});
const getContactsSucess = () => ({
   type: types.GET_CONTACTS_SUCESS,
});
const getContactsFail = () => ({
   type: types.GET_CONTACTS_FAIL,
});

export const getContacts = () => {
   return function (dispatch) {
      dispatch(getContactsStart());
      db.collection('contacts').onSnapshot((snapshot) => {
         try {
            if (snapshot.docs.length > 0) {
               dispatch(getContactsSucess(snapshot));
            } else {
               console.log('No Data');
            }
         } catch (err) {
            dispatch(getContactsFail(err));
         }
      });
   };
};
