//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';
import toast from 'react-hot-toast';
import TripCard from '../../components/trips/TripCard';
import { TripsFilters } from '../../components/trips/TripsFilters';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<(TripObjType & { email: string })[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  // console.log('tripsArr ===', tripsArr);

  const [filterVal, setFilterVal] = useState('');
  // '/filter?country=france'
  // '/filter?city=paris'
  // '/filter?rating=3'
  // '/filter?country=france&city=paris&rating=3'
  useEffect(() => {
    // toast.loading('Loading...');
    if (filterVal) {
      getPosts(`${beBaseUrl}/trips/${filterVal}`);
    } else {
      getPosts(`${beBaseUrl}/trips`);
    }
  }, [filterVal]);

  function getPosts(url: string) {
    setIsLoading(true);
    // su axios gaunam postus ir irasom i tripsArr
    axios
      .get(url)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setTripsArr(resp.data);
      })
      .catch((error: Error) => {
        console.warn('error cia cia cia ===', error);
        toast.error('Failed to fetch trips');
        setIsError('Kazkas neivyko kaip turejo, bandykit veliau');
        return null;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>TripsPage</h1>
        <p>Welcome to our TripsPage</p>

        {isLoading && <p className='alert alert-secondary mb-0'>Loading....</p>}
        {isError && <p className='alert alert-danger mb-0 text-center'>{isError}</p>}
        <div className='tripsPageGrid'>
          <TripsFilters onFilterChange={setFilterVal} />

          <ul className='unlisted tripsList'>
            {tripsArr?.map((tObj) => (
              <li className='mb-4' key={tObj.id}>
                <TripCard item={tObj} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
