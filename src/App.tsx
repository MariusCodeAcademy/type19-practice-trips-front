import './styles/App.css';

import Header from './components/layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripsPage from './pages/trips/TripsPage';
import SingleTripPage from './pages/trips/SingleTripPage';
import { Toaster } from 'react-hot-toast';
import AddTripPage from './pages/trips/AddTripPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <div className=''>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/trips/add' element={<AddTripPage />} />
        <Route path='/trips/:tripId' element={<SingleTripPage />} />
      </Routes>
    </div>
  );
}
