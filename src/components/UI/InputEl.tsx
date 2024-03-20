import { FormikProps } from 'formik';
import { TripObjTypeNoId } from '../../types/types';

type InputElProps = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: keyof TripObjTypeNoId;
  formik: FormikProps<TripObjTypeNoId>;
  className?: string;
};

export default function InputEl({
  formik,
  id,
  placeholder,
  className,
  type = 'text',
}: InputElProps) {
  const Element = type === 'textarea' ? 'textarea' : 'input';

  const isError = formik.errors && formik.errors[id] && formik.touched && formik.touched[id];
  return (
    <label className={`form-label w-100 ${className}`}>
      <span>{placeholder}</span>
      <Element
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // isInvalid tik kai kalaida ir blur
        className={`form-control ${isError ? 'is-invalid' : ''}`}
        type={type}
        id={id}
        placeholder={placeholder}
      />
      {isError && (
        <span className='bg-danger-subtle rounded-1 d-block text-danger px-3 py-1 '>
          {formik.errors[id]}
        </span>
      )}
    </label>
  );
}
