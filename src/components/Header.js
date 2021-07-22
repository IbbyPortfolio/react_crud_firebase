import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
   return (
      <div className='container-fluid'>
         <nav className=''>
            <NavLink to='/' className='btn'>
               Home
            </NavLink>
            <NavLink to='/add' className='btn'>
               Add
            </NavLink>
            <NavLink to='/about' className='btn'>
               About
            </NavLink>
         </nav>
      </div>
   );
};

export default Header;
