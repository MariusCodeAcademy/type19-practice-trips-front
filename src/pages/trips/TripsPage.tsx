//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';

import toast from 'react-hot-toast';
import TripCard from '../../components/trips/TripCard';
import FilterBox from '../../components/UI/FilterBox';
import { Link, useSearchParams } from 'react-router-dom';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<TripObjType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('tripsArr ===', tripsArr);

  const [searchParams, setSearchParams] = useSearchParams();

  console.log('searchParams ===', searchParams.get('country'));
  const filterCountryVal = searchParams.get('country');
  useEffect(() => {
    // toast.loading('Loading...');
    if (filterCountryVal) {
      getPosts(`${beBaseUrl}/trips/filter?country=${filterCountryVal}`);
    } else {
      getPosts(`${beBaseUrl}/trips`);
    }
  }, [filterCountryVal]);

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

  // function filterBy(countryVal: string) {
  //   // parsiusti atfiltruotus duomenis
  //   getPosts(`${beBaseUrl}/trips/filter?country=${countryVal}`);
  // }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>TripsPage</h1>
        <p>Welcome to our TripsPage</p>
        <Link to={'/trips?country=france'} className='btn btn-outline-dark'>
          filter by country = france
        </Link>
        <Link to={'/trips?country=United Kingdom'} className='btn btn-outline-dark'>
          filter by country = UK
        </Link>
        <Link to={'/trips?country=jamaika'} className='btn btn-outline-dark'>
          filter by country = JM
        </Link>
        {/* <button onClick={() => filterBy('france')} className='btn btn-outline-dark'>
          filter by country = france
        </button> */}
        {/* <button onClick={() => filterBy('United Kingdom')} className='btn btn-outline-dark'>
          filter by country = United Kingdom
        </button> */}
        {isLoading && <p className='alert alert-secondary mb-0'>Loading....</p>}
        {isError && <p className='alert alert-danger mb-0 text-center'>{isError}</p>}
        <div className='tripsPageGrid'>
          <TripsFilters />

          <ul className='unlisted '>
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

export function TripsFilters() {
  return (
    <div>
      <FilterBox title='Filter by date'>
        <div>pagal ta</div>
        <div>pagal ana</div>
        <div>pagal sali</div>
      </FilterBox>
    </div>
  );
}
