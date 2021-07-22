import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';

const View = () => {
   const [data, setData] = useState('');
   console.log(data);
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

   return (
      <div className='container mt-5'>
         <div className='card'>
            <div className='card-header lead'>User Details</div>
            <div className='card-body'>
               <p className='card-text'> Name: {data.name}</p>
               <p className='card-text'> Mobile: {data.mobile}</p>
               <p className='card-text'> Email:{data.email}</p>
               <p className='card-text'> Address: {data.address}</p>
               <Link to='/'>
                  <button className='btn btn-info'>Go Back</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default View;
