import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

const ListRecord = () => {
   const [data, setData] = useState('');

   useEffect(() => {
      db.collection('contacts').onSnapshot((snapshot) => {
         if (snapshot.docs.length > 0) {
            setData(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
               }))
            );
         } else {
            console.log('No Data');
         }
      });
   }, []);

   const handleDelete = (id) => {
      if (window.confirm('Are you sure want to delete this record?')) {
         db.collection('contacts')
            .doc(id)
            .delete()
            .then(() => {
               console.log('Document successfully deleted!');
            })
            .catch((error) => {
               console.error('Error removing document: ', error);
            });
      }
   };

   return (
      <div className='container-fluid mt-5'>
         <div className='row'>
            <div className='col-lg-12'>
               <div className='jumbotron'>
                  <h2 className='display-2'>Content Management System</h2>
               </div>
               <table className='table table-bordered table-striped'>
                  <thead className='thead-dark'>
                     <tr>
                        <th scope='col'> No.</th>
                        <th scope='col'> Name</th>
                        <th scope='col'> Mobile</th>
                        <th scope='col'> Email</th>
                        <th scope='col'> Address</th>
                        <th scope='col'> Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {Object.keys(data).map((id, index) => {
                        return (
                           <tr key={id}>
                              <th scope='row'>{index + 1}</th>
                              <td>{data[id].data.name}</td>
                              <td>{data[id].data.mobile}</td>
                              <td>{data[id].data.email}</td>
                              <td>{data[id].data.address}</td>
                              <td>
                                 <Link to={`/update/${data[id].id}`}>
                                    <button className='btn text-primary'>
                                       <i className='fas fa-pencil-alt' />
                                    </button>
                                 </Link>
                                 <button
                                    className='btn text-danger'
                                    onClick={() => handleDelete(data[id].id)}
                                 >
                                    <i className='fas fa-trash-alt' />
                                 </button>
                                 <Link to={`/view/${data[id].id}`}>
                                    <button className='btn text-info'>
                                       <i className='fas fa-eye' />
                                    </button>
                                 </Link>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default ListRecord;
