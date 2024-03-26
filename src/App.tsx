import './styles/App.css';

import Header from './components/layout/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripsPage from './pages/trips/TripsPage';
import SingleTripPage from './pages/trips/SingleTripPage';
import { Toaster } from 'react-hot-toast';
import AddTripPage from './pages/trips/AddTripPage';
import AuthPage from './pages/AuthPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useAuthCtx } from './store/AuthProvider';
import UserPage from './pages/UserPage';
import UserTrips from './pages/UserTrips';
import CountriesPage from './pages/countries/CountriesPage';
import SingleCountryPage from './pages/countries/SingleCountryPage';

export default function App() {
  const { isUserLoggedIn } = useAuthCtx();
  return (
    <div className=''>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/countries' element={<CountriesPage />} />
        <Route path='/countries/:countryId' element={<SingleCountryPage />} />
        {/* <Route path='/auth' element={<AuthPage />} /> */}
        <Route
          path='/auth/login'
          element={isUserLoggedIn ? <Navigate to={'/trips'} /> : <Login />}
        />
        <Route
          path='/auth/register'
          element={isUserLoggedIn ? <Navigate to={'/trips'} /> : <Register />}
        />
        <Route
          path='/user'
          element={isUserLoggedIn ? <UserPage /> : <Navigate to={'/auth/login'} />}
        />
        <Route
          path='/user/user-trips'
          element={isUserLoggedIn ? <UserTrips /> : <Navigate to={'/auth/login'} />}
        />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/trips/add' element={<AddTripPage />} />
        <Route path='/trips/:tripId' element={<SingleTripPage />} />
      </Routes>
    </div>
  );
}
