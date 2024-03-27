//

import { useEffect, useState } from 'react';
import Button from '../components/UI/Button';
import { useAuthCtx } from '../store/AuthProvider';
import { usersUrl } from '../config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { UserObjType } from '../types/types';
import { getNiceDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import UpdateUserForm from '../components/auth/UpdateUserForm';

export default function UserPage() {
  const { email, userId } = useAuthCtx();
  const [userFromBackObj, setUserFromBackObj] = useState<UserObjType>({
    name: '',
    created_at: '',
    email: '',
    password: '',
  });
  const [username, setUsername] = useState('');
  console.log('userFromBackObj ===', userFromBackObj);

  useEffect(() => {
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
    getUser(`${usersUrl}/${userId}`);
  }, [userId]);

  async function updateUsername() {
    try {
      await axios.put(`${usersUrl}/update/name/${userId}`, { updatedName: username });
      toast.success('Username updated');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn('ivyko klaida:', error.response?.data);
        toast.error(error.response?.data);
      } else {
        console.warn('ivyko klaida:', error);
      }
    }
  }

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
          <button
            onClick={updateUsername}
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon2'>
            Update
          </button>
        </div>

        <p className='h5 fw-normal'>Created At: {getNiceDate(userFromBackObj.created_at)}</p>

        <hr />
        <UpdateUserForm userInfo={userFromBackObj} />
      </div>
    </div>
  );
}
