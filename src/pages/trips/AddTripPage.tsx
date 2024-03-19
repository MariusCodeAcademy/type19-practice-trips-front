import { FormikProps, useFormik } from 'formik';
import { TripObjTypeNoId } from '../../types/types';
import axios, { AxiosError } from 'axios';
import { beBaseUrl } from '../../config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import InputEl from '../../components/UI/InputEl';

const initFormValues: TripObjTypeNoId = {
  name: 'Trip to Jamaika',
  date: '',
  country: 'Jamaika',
  city: 'Mur mur',
  rating: 0,
  description: '',
  price: 699,
  user_id: 333,
  image_main: '',
  images_1: '',
  images_2: '',
  images_3: '',
};

export default function AddTripPage() {
  // add formik
  const formik = useFormik<TripObjTypeNoId>({
    initialValues: { ...initFormValues },
    // validationSchema: Yup.object({
    //   name: Yup.string().min(3).max(255).required(),
    //   date: Yup.date().min('2024-03-18').required(),
    //   country: Yup.string().min(3).max(255).required(),
    //   city: Yup.string().min(3).max(255).required(),
    //   description: Yup.string().min(10).required(),
    //   rating: Yup.number().min(0).max(5).required(),
    //   price: Yup.number().min(0).required(),
    //   image_main: Yup.string().min(3).max(255).required(),
    //   images_1: Yup.string().min(3).max(255),
    //   images_2: Yup.string().min(3).max(255),
    //   images_3: Yup.string().min(3).max(255),
    // }),
    onSubmit: (values) => {
      // console.log('values ===', JSON.stringify(values, null, 2));
      // nesiusti images_*
      const finalObj = { ...values };
      if (values.images_1?.trim() === '') delete finalObj.images_1;
      if (values.images_2?.trim() === '') delete finalObj.images_2;
      if (values.images_3?.trim() === '') delete finalObj.images_3;
      sendDataToBe(finalObj);
    },
  });

  // formik.setErrors();

  const navigate = useNavigate();

  function sendDataToBe(data: TripObjTypeNoId) {
    // nusiuncia duomenis
    axios
      .post(`${beBaseUrl}/trips`, data)
      .then((resp) => {
        console.log('resp ===', resp);
        // jei sekme tai naviguojam i trips
        if (resp.status === 200) {
          // naviguoti
          toast.success('Created Trip');
          navigate('/trips');
        } else {
          console.warn('kazkas negerai back end status');
        }
      })
      .catch((error) => {
        const axiosErr = error as AxiosError;
        console.warn('sendDataToBe ivyko klaida:');
        console.log(JSON.stringify(axiosErr.response?.data, null, 2));
        toast.error('Somening went wrong');
        // jei nesekme tai rodom klaidas arba klaida
        if (axiosErr.response?.data) {
          formik.setErrors(axiosErr.response.data);
        }
      });
  }

  // type FormikType = typeof formik
  // initial values formik

  // console.log('formik klaidos ===', formik.errors);

  // sukurti likusius  InputEl
  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>AddTripPage</h1>
        <p>Welcome to our AddTripPage</p>

        <form className='addFromGrid ' onSubmit={formik.handleSubmit} noValidate>
          <InputEl formik={formik} id='name' placeholder='Enter Title' />
          <InputEl formik={formik} id='date' placeholder='Enter Date' type='date' />
          <InputEl formik={formik} id='country' placeholder='Enter country' />
          <InputEl formik={formik} id='city' placeholder='Enter city' />
          <InputEl
            className='gridSpan2'
            formik={formik}
            id='description'
            placeholder='Enter description'
            type='textarea'
          />
          <InputEl formik={formik} id='rating' placeholder='Enter rating' type='number' />
          <InputEl formik={formik} id='price' placeholder='Enter price' type='number' />
          <InputEl formik={formik} id='image_main' placeholder='Enter main image' type='text' />
          <InputEl formik={formik} id='images_1' placeholder='Enter image 1' type='text' />
          <InputEl formik={formik} id='images_2' placeholder='Enter image 2' type='text' />
          <InputEl formik={formik} id='images_3' placeholder='Enter image 3' type='text' />

          <button type='submit' className='btn btn-primary'>
            Add trip
          </button>
        </form>
      </div>
    </div>
  );
}
