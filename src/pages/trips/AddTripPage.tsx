import { FormikProps, useFormik } from 'formik';
import { TripObjType, TripObjTypeNoId } from '../../types/types';
import axios from 'axios';
import { beBaseUrl } from '../../config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type InputElProps = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: keyof TripObjTypeNoId;
  formik: FormikProps<TripObjTypeNoId>;
  className?: string;
};
function InputEl({ formik, id, placeholder, className, type = 'text' }: InputElProps) {
  // console.log('id ===', id);
  const Element = type === 'textarea' ? 'textarea' : 'input';
  return (
    <label className={`form-label w-100 ${className}`}>
      <span>{placeholder}</span>
      <Element
        value={formik.values[id]}
        onChange={formik.handleChange}
        className='form-control'
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </label>
  );
}

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
    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      sendDataToBe(values);
    },
  });

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
        console.warn('sendDataToBe ivyko klaida:', error);
        toast.error('Somening went wrong');
        // jei nesekme tai rodom klaidas arba klaida
      });
  }

  // type FormikType = typeof formik
  // initial values formik

  console.log('formik ===', formik.values);

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
