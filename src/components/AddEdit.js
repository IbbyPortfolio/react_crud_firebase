import React, { useEffect, useState } from 'react';
import { isEmpty, valuesIn } from 'lodash';
import { db } from '../firebase';
import { useHistory, useParams } from 'react-router-dom';

const AddEdit = () => {
   const values = {
      name: '',
      mobile: '',
      email: '',
      address: '',
   };
   const history = useHistory();

   const [initialState, setInitialState] = useState(values);
   const { name, mobile, email, address } = initialState;
   const [data, setData] = useState('');
   console.log('data:', data);

   const { id } = useParams();

   useEffect(() => {
      db.collection('contacts')
         .doc(id)
         .get()
         .then((doc) => {
            if (doc.exists) {
               // console.log('Document data:', doc.data());
               setData(doc.data());
            } else {
               // doc.data() will be undefined in this case
               console.log('No such document!');
            }
         })
         .catch((error) => {
            console.log('Error getting document:', error);
         });
   }, [id]);

   useEffect(() => {
      if (isEmpty(id)) {
         setInitialState({ ...values });
      } else {
         setInitialState({ ...data });
      }
   }, [id, data]);

   const handleInputChange = (e) => {
      let { name, value } = e.target;
      setInitialState({
         ...initialState,
         [name]: value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isEmpty(id)) {
         db.collection('contacts').add(initialState);
      } else {
         db.collection('contacts').doc(id).set(initialState);
      }
      history.push('/');
   };

   return (
      <div>
         <div className='row'>
            <div className='col-md-6'>
               <form onSubmit={handleSubmit}>
                  <div>
                     <label>Name</label>
                     <input
                        type='text'
                        value={name}
                        name='name'
                        onChange={handleInputChange}
                     />
                  </div>
                  <div>
                     <label>Mobile</label>
                     <input
                        type='text'
                        value={mobile}
                        name='mobile'
                        onChange={handleInputChange}
                     />
                  </div>
                  <div>
                     <label>Email</label>
                     <input
                        type='text'
                        value={email}
                        name='email'
                        onChange={handleInputChange}
                     />
                  </div>
                  <div>
                     <label>Address</label>
                     <input
                        type='text'
                        value={address}
                        name='address'
                        onChange={handleInputChange}
                     />
                  </div>
                  <button>Cancel</button>
                  <button className='btn btn-success btn-raised'>Submit</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddEdit;
