type InputElProps = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: string;
  // formik: FormikProps<Omit<TripObjType, 'id'>>;
  formik: any;
};
export default function InputEl({ formik, id, placeholder, type = 'text' }: InputElProps) {
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
