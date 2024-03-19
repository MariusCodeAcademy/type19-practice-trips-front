//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseUrl } from '../../config';
import { TripObjType } from '../../types/types';

import toast from 'react-hot-toast';
import TripCard from '../../components/trips/TripCard';
import FilterBox from '../../components/UI/FilterBox';
import Rating from '../../components/UI/Rating';

export default function TripsPage() {
  const [tripsArr, setTripsArr] = useState<TripObjType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('tripsArr ===', tripsArr);

  const [filterVal, setFilterVal] = useState('');
  // '/filter?country=france'
  // '/filter?city=paris'
  // '/filter?rating=3'
  // '/filter?country=france&city=paris'&rating=3'
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

        <button onClick={() => setFilterVal('')} className='btn btn-outline-dark'>
          All
        </button>
        <button
          onClick={() => setFilterVal('/filter?country=france')}
          className='btn btn-outline-dark'>
          filter by country = france
        </button>
        <button
          onClick={() => setFilterVal('/filter?country=United Kingdom')}
          className='btn btn-outline-dark'>
          UK
        </button>

        {isLoading && <p className='alert alert-secondary mb-0'>Loading....</p>}
        {isError && <p className='alert alert-danger mb-0 text-center'>{isError}</p>}
        <div className='tripsPageGrid'>
          <TripsFilters onFilterChange={setFilterVal} />

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

type TripsFiltersProps = {
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};

export function TripsFilters({ onFilterChange }: TripsFiltersProps) {
  const [countySelVal, setCountySelVal] = useState('all');
  console.log('countySelVal ===', countySelVal);
  function countryChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setCountySelVal(e.target.value);
    if (e.target.value === 'all') {
      return onFilterChange('');
    }
    onFilterChange(`/filter?country=${e.target.value}`);
    // setFilterVal('/filter?country=france')
  }

  return (
    <div>
      <FilterBox title='Filter by Country'>
        <select
          value={countySelVal}
          onChange={countryChangeHandler}
          className='form-select'
          aria-label='Filter by Country'>
          <option value={'all'}>Filter by Country</option>
          <option value='france'>France</option>
          <option value='united kingdom'>UK</option>
          <option value='italy'>Italy</option>
          <option value='jamaika'>Jamaika</option>
        </select>
      </FilterBox>
      <FilterBox title='Filter by City'>
        <select
          value={countySelVal}
          onChange={countryChangeHandler}
          className='form-select'
          aria-label='Filter by Country'>
          <option value={'all'}>Filter by Country</option>
          <option value='france'>France</option>
          <option value='united kingdom'>UK</option>
          <option value='italy'>Italy</option>
          <option value='jamaika'>Jamaika</option>
        </select>
      </FilterBox>
      <FilterBox title='Filter by Rating'>
        <Rating rating={5} />
      </FilterBox>
    </div>
  );
}
