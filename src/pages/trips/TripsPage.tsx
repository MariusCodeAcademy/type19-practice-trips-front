//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<TripObjType[] | null>(null);
  console.log('tripsArr ===', tripsArr);

  useEffect(() => {
    getPosts(`${beBaseUrl}/trips`).then((data) => setTripsArr(data));
  }, []);

  function getPosts(url: string): Promise<TripObjType[] | null> {
    // su axios gaunam postus ir irasom i tripsArr
    return axios
      .get(url)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        return resp.data;
      })
      .catch((error: Error) => {
        console.log('error ===', error);
        return null;
      });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>TripsPage</h1>
        <p>Welcome to our TripsPage</p>
        <ul className='list-group'>
          {tripsArr?.map((tObj) => (
            <li className='list-group-item' key={tObj.id}>
              {tObj.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
