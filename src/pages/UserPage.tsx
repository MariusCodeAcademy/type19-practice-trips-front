//

import { useEffect, useState } from 'react';
import Button from '../components/UI/Button';
import { useAuthCtx } from '../store/AuthProvider';
import { usersUrl } from '../config';
import axios, { AxiosResponse } from 'axios';
import { UserObjType } from '../types/types';
import { getNiceDate } from '../utils/helpers';

export default function UserPage() {
  const { email, userId } = useAuthCtx();
  const [userFromBackObj, setUserFromBackObj] = useState<UserObjType>({
    name: 'old val',
    created_at: '',
    email: '',
    password: '',
  });
  const [username, setUsername] = useState('');
  console.log('userFromBackObj ===', userFromBackObj);

  useEffect(() => {
    getUser(`${usersUrl}/${userId}`);
  }, [userId]);

  function getUser(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse<UserObjType>) => {
        // console.log('resp.data ===', resp.data);
        setUserFromBackObj(resp.data);
        setUsername(resp.data.name || '');
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  function updateUsername() {}

  return (
    <div>
      <div className='container'>
        <h1 className='display-4'>Welcome {userFromBackObj.email}</h1>
        <p>Welcome to Your homepage UserPage</p>

        <hr />
        <div className='input-group mb-3'>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Username'
          />
          <button className='btn btn-outline-secondary' type='button' id='button-addon2'>
            Update
          </button>
        </div>

        <p className='h5 fw-normal'>Created At: {getNiceDate(userFromBackObj.created_at)}</p>

        <hr />
      </div>
    </div>
  );
}
