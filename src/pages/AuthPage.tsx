//

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function AuthPage() {
  return (
    <div>
      <div className='container'>
        <Register />
        <Login />
      </div>
    </div>
  );
}
