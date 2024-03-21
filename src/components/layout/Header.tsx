//

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';

type NavItemProps = {
  to: string;
  children: string;
  subItem?: boolean;
};

export function NavItem({ to, children, subItem }: NavItemProps) {
  return (
    <NavLink end className={`${subItem ? 'fs-6' : 'fs-5'} px-3 py-2 d-block navLink`} to={to}>
      {children}
    </NavLink>
  );
}

export default function Header() {
  const { isUserLoggedIn } = useAuthCtx();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className='bg-dark text-light position-relative '>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link to={'/'}>
          <h2 className='mb-0 py-1'>Logo</h2>
        </Link>
        <nav
          onClick={closeMenu}
          className={`${isMenuOpen ? 'on ' : ''} mobileMenu d-md-block bg-dark `}>
          <ul className='unlisted d-flex flex-column flex-md-row  align-md-items-center'>
            <li>
              <NavItem to='/'>Home</NavItem>
            </li>
            <li className='hasChildren position-relative'>
              <NavItem to='/trips'>Trips</NavItem>
              <ul className='submenu ps-3 ps-md-0 unlisted bg-dark  rounded-bottom-2 overflow-hidden'>
                <li>
                  <NavItem subItem to='/trips/add'>
                    Add Trip
                  </NavItem>
                </li>
                <li>
                  <NavItem subItem to='/trips/my/trips'>
                    My Trips
                  </NavItem>
                </li>
              </ul>
            </li>

            <li>
              <NavItem to='/countries'>Countries</NavItem>
            </li>
            {isUserLoggedIn && (
              <li>
                <NavItem to='/auth/login'>Logout</NavItem>
              </li>
            )}
            {!isUserLoggedIn && (
              <>
                <li>
                  <NavItem to='/auth/register'>Register</NavItem>
                </li>
                <li>
                  <NavItem to='/auth/login'>Login</NavItem>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className='d-md-none'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='btn text-white'>
            <i className={`bi bi-${isMenuOpen ? 'x-square' : 'list'} fs-3`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
