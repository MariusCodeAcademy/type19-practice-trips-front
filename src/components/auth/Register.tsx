import React from 'react';
import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';

type RegisterUserObjType = {
  name?: string;
  email: string;
  password: string;
};

export default function Register() {
  const formik = useFormik<RegisterUserObjType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className='container min-vh-100 mt-5'>
        <h1 className='h3 text-center'>Register</h1>

        <form>
          <div className='mb-3'>
            <InputEl formik={formik} placeholder='Name' type='text' id='name' />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input type='email' className='form-control' id='email' />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='password' />
          </div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
