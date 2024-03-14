import './styles/App.css';

import Header from './components/layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripsPage from './pages/trips/TripsPage';
import SingleTripPage from './pages/trips/SingleTripPage';

export default function App() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/trips' element={<TripsPage />} />
        <Route path='/trips/:tripId' element={<SingleTripPage />} />
      </Routes>
    </div>
  );
}
