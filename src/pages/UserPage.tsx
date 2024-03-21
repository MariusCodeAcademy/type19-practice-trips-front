//

import { createContext } from 'react';
import CounterList from '../components/counter/CounterList';

export const CounterContext = createContext({
  val: 0,
  sayHi: () => {},
});

export default function UserPage() {
  const initVal = 10;
  function sayHi() {
    console.log('hello');
  }
  const counterCtxVal = { val: initVal, sayHi };

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

        <hr />
        <CounterContext.Provider value={counterCtxVal}>
          <CounterList />
        </CounterContext.Provider>
      </div>
    </div>
  );
}
