//

import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-dark text-light'>
      <div className='container d-flex justify-content-between align-items-center'>
        <Link to={'/'}>
          <h2 className='mb-0 py-2'>Logo</h2>
        </Link>
        <nav className='d-none d-md-block'>
          <ul className='unlisted d-flex align-items-center'>
            <li>
              <NavLink className={'fs-5 px-3 py-2 d-block navLink'} to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={'fs-5 px-3 py-2 d-block navLink'} to='/trips'>
                Trips
              </NavLink>
            </li>
            <li>
              <NavLink className={'fs-5 px-3 py-2 d-block navLink'} to='/trips/add'>
                Add Trip
              </NavLink>
            </li>
            <li>
              <NavLink className={'fs-5 px-3 py-2 d-block navLink'} to='/countries'>
                Countries
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='d-md-none'>
          <button className='btn text-white'>
            <i className='bi bi-list fs-3'></i>
          </button>
        </div>
      </div>
    </header>
  );
}
