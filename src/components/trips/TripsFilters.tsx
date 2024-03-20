import { useEffect, useState } from 'react';
import FilterBox from '../UI/FilterBox';
import axios from 'axios';
import { beBaseUrl } from '../../config';

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
  function cityChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    // setCountySelVal(e.target.value);
    if (e.target.value === 'all') {
      return onFilterChange('');
    }
    onFilterChange(`/filter?city=${e.target.value}`);
    // setFilterVal('/filter?country=france')
  }

  const [starsSelected, setStarsSelected] = useState(2);

  const [countriesArr, setCountriesArr] = useState<{ country: string }[]>([]);
  const [citiesArr, setCitiesArr] = useState<{ city: string }[]>([]);
  // console.log('countriesArr ===', countriesArr);
  console.log('citiesArr ===', citiesArr);
  useEffect(() => {
    // get countries
    getCountries();
    getCities();
  }, []);

  function getCountries() {
    axios
      .get(`${beBaseUrl}/trips/countries`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setCountriesArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
  }
  function getCities() {
    axios
      .get(`${beBaseUrl}/trips/cities`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setCitiesArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
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
          {countriesArr.map((cObj) => (
            <option key={cObj.country} value={cObj.country}>
              {cObj.country}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title='Filter by City'>
        <select
          // value={countySelVal}
          onChange={cityChangeHandler}
          className='form-select'
          aria-label='Filter by City'>
          <option value={'all'}>Filter by City</option>
          {citiesArr.map((cObj) => (
            <option key={cObj.city} value={cObj.city}>
              {cObj.city}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title='Filter by Rating'>
        <div className='btn-group' role='group' aria-label='Basic outlined example'>
          <button
            onClick={() => setStarsSelected(1)}
            type='button'
            className={`btn btn${starsSelected === 1 ? '' : '-outline'}-secondary`}>
            1 star
          </button>
          <button
            onClick={() => setStarsSelected(2)}
            type='button'
            className={`btn btn${starsSelected === 2 ? '' : '-outline'}-secondary`}>
            2
          </button>
          <button
            onClick={() => setStarsSelected(3)}
            type='button'
            className={`btn btn${starsSelected === 3 ? '' : '-outline'}-secondary`}>
            3
          </button>
          <button
            onClick={() => setStarsSelected(4)}
            type='button'
            className={`btn btn${starsSelected === 4 ? '' : '-outline'}-secondary`}>
            4
          </button>
          <button
            onClick={() => setStarsSelected(5)}
            type='button'
            className={`btn btn${starsSelected === 5 ? '' : '-outline'}-secondary`}>
            5
          </button>
        </div>
        <br />
        <button onClick={() => setStarsSelected(0)} className='btn'>
          clear
        </button>
      </FilterBox>
    </div>
  );
}
