import React from 'react';
// import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import axios, { AxiosResponse } from 'axios';
import { beBaseUrl } from '../../config';
import { useAuthCtx } from '../../store/AuthProvider';

import { InputEl } from '../UI/InputEl';
import { Link } from 'react-router-dom';
import { UserObjType } from '../../types/types';

type RegisterUserObjType = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Register() {
  const { login } = useAuthCtx();
  const formik = useFormik<RegisterUserObjType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: object({
      name: string().min(3).max(255),
      email: string().email().required(),
      password: string().min(4).max(100).required(),
      passwordConfirm: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required(),
    }),
    onSubmit: (values) => {
      // console.log(values);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm, ...finalObjToBack } = values;
      // delete finalObjToBack.passwordConfirm;
      console.log('finalObjToBack ===', finalObjToBack);
      sendRegisterDataToBack(finalObjToBack);
    },
  });

  function sendRegisterDataToBack(data: Omit<RegisterUserObjType, 'passwordConfirm'>) {
    axios
      .post(`${beBaseUrl}/auth/register`, data)
      .then((res: AxiosResponse<UserObjType>) => {
        console.log('res.data ===', res.data);
        login(data.email, res.data.id || 0);
      })
      .catch((err) => {
        console.log('err ===', err.response.data);
      });
  }

  return (
    <div>
      <div className='container min-vh-100 mt-5'>
        <h1 className='h3 text-center'>Register</h1>

        <form noValidate onSubmit={formik.handleSubmit}>
          <InputEl formik={formik} placeholder='Name' type='text' id='name' />
          <InputEl formik={formik} placeholder='Email' type='email' id='email' />
          <InputEl formik={formik} placeholder='Password' type='password' id='password' />
          <InputEl
            formik={formik}
            placeholder='Password confirm'
            type='password'
            id='passwordConfirm'
          />

          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </form>
        <p>
          Registered? <Link to={'/auth/login'}>login here</Link>
        </p>
      </div>
    </div>
  );
}
