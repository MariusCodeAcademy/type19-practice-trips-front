// import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import axios, { AxiosResponse } from 'axios';
import { beBaseUrl, usersUrl } from '../../config';
import { useAuthCtx } from '../../store/AuthProvider';
import { InputEl } from '../UI/InputEl';
import { UserObjType } from '../../types/types';
import { useEffect } from 'react';

type UpdateUserObjType = {
  name?: string;
  email: string;
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

type UpdateUserFormProps = {
  email: string;
  name: string;
  userId: number;
};

export default function UpdateUserForm({ email, name, userId }: UpdateUserFormProps) {
  console.log('UpdateUserForm userInfo ===', email, name);
  const formik = useFormik<UpdateUserObjType>({
    initialValues: {
      name: name,
      email: email,
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: object({
      name: string().min(3).max(255),
      email: string().email().required(),
      currentPassword: string().min(4).max(100).required(),
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
      // console.log('finalObjToBack ===', finalObjToBack);
      sendUpdateDataToBack(finalObjToBack);
    },
  });

  useEffect(() => {
    console.log('setting values');
    formik.setFieldValue('email', email);
    formik.setFieldValue('name', name);
  }, [email, name]);

  function sendUpdateDataToBack(data: Omit<UpdateUserObjType, 'passwordConfirm'>) {
    console.log('data sending ===', data);
    axios
      .put(`${beBaseUrl}/auth/user/update/${userId}`, data)
      .then((res: AxiosResponse<UserObjType>) => {
        console.log('res.data ===', res.data);
      })
      .catch((err) => {
        console.warn('err sendUpdateDataToBack ===', err.response.data);
      });
  }

  return (
    <div>
      <div className='mt-5'>
        <h2 className='h5 '>Update user info</h2>

        <form noValidate onSubmit={formik.handleSubmit}>
          <InputEl formik={formik} placeholder='Name' type='text' id='name' />
          <InputEl formik={formik} placeholder='Email' type='email' id='email' />
          <InputEl
            formik={formik}
            placeholder='Current Password'
            type='password'
            id='currentPassword'
          />
          <InputEl formik={formik} placeholder='Password' type='password' id='password' />
          <InputEl
            formik={formik}
            placeholder='Password confirm'
            type='password'
            id='passwordConfirm'
          />

          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
