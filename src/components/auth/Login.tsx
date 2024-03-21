import axios from 'axios';
import React from 'react';
import { beBaseUrl } from '../../config';
import { useAuthCtx } from '../../store/AuthProvider';
import { InputEl } from '../UI/InputEl';
import { useFormik } from 'formik';
import { UserObjType } from '../../types/types';
import { Link } from 'react-router-dom';

type LoginObjType = Pick<UserObjType, 'email' | 'password'>;

export default function Login() {
  const { login } = useAuthCtx();

  const formik = useFormik<LoginObjType>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      handleLogin(values);
    },
  });

  console.log('formik.values ===', formik.values);

  function handleLogin(loginObj: LoginObjType) {
    axios
      .post(`${beBaseUrl}/auth/login`, loginObj)
      .then((res) => {
        console.log('res.data ===', res.data);
        login(res.data.email);
      })
      .catch((err) => {
        console.log('err ===', err);
      });
  }
  return (
    <div className='container'>
      <h2> Login here</h2>
      <form noValidate onSubmit={formik.handleSubmit}>
        <InputEl formik={formik} id={'email'} placeholder='Enter email' type='email' />
        <InputEl formik={formik} id={'password'} placeholder='Enter password' type='password' />
        <button className='btn btn-primary' type='submit'>
          Login
        </button>
      </form>
      <p>
        Do not have account? <Link to={'/auth/register'}>regiter here</Link>
      </p>
    </div>
  );
}
