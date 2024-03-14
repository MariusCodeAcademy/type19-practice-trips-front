//

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState(null);

  useEffect(() => {}, []);

  function getPosts() {
    // su axios gaunam postus ir irasom i tripsArr
    // axios.get()
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>TripsPage</h1>
        <p>Welcome to our TripsPage</p>
      </div>
    </div>
  );
}
