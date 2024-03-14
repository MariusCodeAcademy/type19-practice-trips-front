//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';
import { Link } from 'react-router-dom';

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
              <img src={'/img/' + tObj.image_main} alt={tObj.name} className='img-fluid' />
              <h3>{tObj.name}</h3>
              <p className='lead'>{tObj.date}</p>
              <p>
                <span className='fw-bold'>{tObj.country}</span> - {tObj.city}
              </p>
              <p className=''>{tObj.price} eur</p>
              <Link to={'/'}>
                <button className='btn btn-info'>Read more</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
