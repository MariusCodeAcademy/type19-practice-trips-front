//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';
import toast from 'react-hot-toast';
import { TripsFilters } from '../../components/trips/TripsFilters';
import TripsList from '../../components/trips/TripsList';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<(TripObjType & { email: string })[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  // console.log('tripsArr ===', tripsArr);

  const [sortOptVal, setSortOptVal] = useState('');

  let sortedArr = tripsArr !== null ? [...tripsArr] : [];

  switch (sortOptVal) {
    case 'price-min-to-max':
      console.log('price-min-to-max sort');
      sortedArr.sort((a, b) => a.price - b.price);
      break;
    case 'country-a-z':
      console.log('price-min-to-max sort');
      sortedArr.sort((a, b) => a.country.localeCompare(b.country));
      break;
    default:
      console.log('default sort');
      sortedArr = tripsArr;
      break;
  }

  // const sortedArr = tripsArr?.sort((a, b) => a.price - b.price);
  // console.table(sortedArr, ['price', 'name', 'country']);
  const [filterVal, setFilterVal] = useState('');

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

          {/* TripsList */}
          <div className=''>
            <p>active sort: {sortOptVal}</p>
            <select
              value={sortOptVal}
              onChange={(e) => setSortOptVal(e.target.value)}
              className='form-select w-25'>
              <option value={''}>Sort By</option>
              <option value={'price-min-to-max'}>Price min to max</option>
              <option value={'dalykas'}>Price max to min</option>
              <option value={'country-a-z'}>Country a-z</option>
              <option value={'dalykas'}>Country z-a</option>
              <option value={'date-min-to-max'}>Date min-max</option>
            </select>
            <TripsList list={sortedArr} />
          </div>
          {/* <ul className='unlisted tripsList'>
            {tripsArr?.map((tObj) => (
              <li className='mb-4' key={tObj.id}>
                <TripCard item={tObj} />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
