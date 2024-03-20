import React from 'react';
import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';

type RegisterUserObjType = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Register() {
  const formik = useFormik<RegisterUserObjType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className='container min-vh-100 mt-5'>
        <h1 className='h3 text-center'>Register</h1>

        <form onSubmit={formik.handleSubmit}>
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
      </div>
    </div>
  );
}
