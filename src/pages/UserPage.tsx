//

export default function UserPage() {
  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>UserPage</h1>
        <p>Welcome to Your homepage UserPage</p>

        <p className='h3'>Username: ''</p>
        <input className='form-control' type='text' />
        <p className='h3'>Created At: ''</p>

        <button className='btn btn-outline-info'>change password</button>
        <button className='btn btn-outline-info'>update Username</button>
      </div>
    </div>
  );
}
