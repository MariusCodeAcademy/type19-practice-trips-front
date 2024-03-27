//

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import cl from 'classnames';

type NavItemProps = {
  to: string;
  children: string;
  subItem?: boolean;
  onClick?: () => void;
};

export function NavItem({ to, children, subItem, onClick }: NavItemProps) {
  return (
    <NavLink
      onClick={onClick}
      end
      className={`${subItem ? 'fs-6' : 'fs-6'} px-4 py-2 d-block navLink`}
      to={to}>
      {children}
    </NavLink>
  );
}

export default function Header() {
  const { isUserLoggedIn, logout, email } = useAuthCtx();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className='position-relative '>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link to={'/'}>
          <h2 className='mb-0 py-1 fs-3 fw-medium'>Trippy</h2>
        </Link>
        <nav
          onClick={closeMenu}
          // className={`${isMenuOpen ? 'on ' : ''} mobileMenu d-lg-block bg-dark `}>
          className={cl('mobileMenu d-lg-block bg-white ', {
            on: isMenuOpen,
          })}>
          <ul className='unlisted d-flex flex-column flex-lg-row  align-lg-items-center'>
            <li>
              <NavItem to='/'>Home</NavItem>
            </li>
            <li className='hasChildren position-relative'>
              <NavItem to='/trips'>Trips</NavItem>
              <ul className='submenu ps-3 ps-lg-0 unlisted bg-white border  rounded-bottom-2 overflow-hidden'>
                <li>
                  <NavItem subItem to='/trips/add'>
                    Add Trip
                  </NavItem>
                </li>
                <li>
                  <NavItem subItem to='/trips/archive'>
                    Trip archive
                  </NavItem>
                </li>
                <li>
                  <NavItem subItem to='/user/user-trips'>
                    My Trips
                  </NavItem>
                </li>
              </ul>
            </li>

            <li>
              <NavItem to='/countries'>Countries</NavItem>
            </li>

            {isUserLoggedIn && (
              <>
                <li>
                  <NavItem to='/user'>My Space</NavItem>
                </li>
                <li>
                  <NavItem onClick={logout} to='/auth/login'>
                    Logout
                  </NavItem>
                </li>
                <li className='te mb-0 px-3 py-2 d-block navLink'>{email}</li>
              </>
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
        <div className='d-lg-none'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='btn '>
            <i className={`bi bi-${isMenuOpen ? 'x-square' : 'list'} fs-3`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
