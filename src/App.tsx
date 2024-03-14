import './styles/App.css';

import Header from './components/layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}
