import React, { useContext } from 'react';
import { CounterContext } from '../../pages/UserPage';

export default function SingleCounter() {
  // pasiiimam is konteksto
  const counterCtxVal = useContext(CounterContext);
  console.log('counterCtxVal ===', counterCtxVal);

  return (
    <div>
      SingleCounter value {counterCtxVal.val}
      <button onClick={counterCtxVal.sayHi}>hi</button>
    </div>
  );
}
