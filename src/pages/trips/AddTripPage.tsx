import { useFormik } from 'formik';

type InputElProps = {
  name: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: string;
};
function InputEl({ id, name, type = 'text' }: InputElProps) {
  return (
    <label className='form-label w-100'>
      <span>{name}</span>
      <input className='form-control' type={type} id={id} placeholder={name} />
    </label>
  );
}

export default function AddTripPage() {
  // add formik
  // const formik = useFormik({});
  // initial values formik

  // sukurti likusius  InputEl
  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>AddTripPage</h1>
        <p>Welcome to our AddTripPage</p>

        <form noValidate>
          <InputEl id='date' name='Enter Date' type='date' />
          <label className='form-label w-100'>
            <span>Name</span>
            <input className='form-control' type='text' name='name' placeholder='Trip name' />
          </label>
        </form>
      </div>
    </div>
  );
}
