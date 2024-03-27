//

import Button from '../components/UI/Button';

export default function UserPage() {
  return (
    <div>
      <div className='container'>
        <h1 className='display-4'>UserPage</h1>
        <p>Welcome to Your homepage UserPage</p>

        <hr />
        <div className='input-group mb-3'>
          <input type='text' className='form-control' placeholder='Username' />
          <button className='btn btn-outline-secondary' type='button' id='button-addon2'>
            Update
          </button>
        </div>

        <p className='h4 fw-normal'>Created At: ''</p>

        <Button>Update username</Button>

        <hr />
      </div>
    </div>
  );
}
