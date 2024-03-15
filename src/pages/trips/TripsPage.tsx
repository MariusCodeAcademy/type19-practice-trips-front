//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import TripCard from '../../components/trips/TripCard';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<TripObjType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('tripsArr ===', tripsArr);

  useEffect(() => {
    setIsLoading(true);
    // toast.loading('Loading...');
    getPosts(`${beBaseUrl}/trips`).then((data) => {
      setTripsArr(data);
      setIsLoading(false);
    });
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
        console.warn('error cia cia cia ===', error);
        toast.error('Failed to fetch trips');
        setIsError('Kazkas neivyko kaip turejo, bandykit veliau');
        return null;
      });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>TripsPage</h1>
        <p>Welcome to our TripsPage</p>
        {isLoading && <p className='alert alert-secondary mb-0'>Loading....</p>}
        {isError && <p className='alert alert-danger mb-0 text-center'>{isError}</p>}
        <ul className='unlisted '>
          {tripsArr?.map((tObj) => (
            <li className='' key={tObj.id}>
              <TripCard item={tObj} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
