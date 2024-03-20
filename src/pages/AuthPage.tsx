//

import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function AuthPage() {
  return (
    <div>
      <div className='container'>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
      </div>
    </div>
  );
}
