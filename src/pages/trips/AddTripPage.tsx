import { FormikProps, useFormik } from 'formik';
import { TripObjType } from '../../types/types';

type InputElProps = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: keyof Omit<TripObjType, 'id'>;
  formik: FormikProps<Omit<TripObjType, 'id'>>;
  // formik: any;
};
function InputEl({ formik, id, placeholder, type = 'text' }: InputElProps) {
  // console.log('id ===', id);
  return (
    <label className='form-label w-100'>
      <span>{placeholder}</span>
      <input
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

const initFormValues: Omit<TripObjType, 'id'> = {
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
  const formik = useFormik<Omit<TripObjType, 'id'>>({
    initialValues: { ...initFormValues },
    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      // sendDataToBe(data)
    },
  });

  function sendDataToBe(data) {
    // nusiuncia duomenis
    // jei sekme tai naviguojam i trips
    // jei nesekme tai rodom klaidas arba klaida
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

        <form onSubmit={formik.handleSubmit} noValidate>
          <label className='form-label w-100'>
            <span>Name</span>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              className='form-control'
              type='text'
              name='name'
              placeholder='Trip name'
            />
          </label>
          <InputEl formik={formik} id='name' placeholder='Enter Title' />
          <InputEl formik={formik} id='date' placeholder='Enter Date' type='date' />
          <InputEl formik={formik} id='country' placeholder='Enter country' />
          <InputEl formik={formik} id='city' placeholder='Enter city' />
          <InputEl formik={formik} id='rating' placeholder='Enter rating' type='number' />
          <InputEl
            formik={formik}
            id='description'
            placeholder='Enter description'
            type='textarea'
          />
          <InputEl formik={formik} id='price' placeholder='Enter price' type='number' />
          <InputEl formik={formik} id='image_main' placeholder='Enter main image' type='text' />
          {/* <InputEl id='images_1' name='Enter image 1' type='text' />
          <InputEl id='images_2' name='Enter image 2' type='text' />
          <InputEl id='images_3' name='Enter image 3' type='text' /> */}

          <button type='submit' className='btn btn-primary'>
            Add trip
          </button>
        </form>
      </div>
    </div>
  );
}
