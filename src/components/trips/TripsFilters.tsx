import { useEffect, useState } from 'react';
import FilterBox from '../UI/FilterBox';
import axios from 'axios';
import { beBaseUrl } from '../../config';

type TripsFiltersProps = {
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};

export function TripsFilters({ onFilterChange }: TripsFiltersProps) {
  const [countySelVal, setCountySelVal] = useState('all');
  const [citySelValue, setCitySelValue] = useState('all');
  const [starsSelected, setStarsSelected] = useState(0);

  useEffect(() => {
    console.log('pasikeite');
    console.log('countySelVal ===', countySelVal);
    console.log('citySelValue ===', citySelValue);
    let finalFilterString = `/filter?`;
    if (countySelVal !== 'all') finalFilterString += `country=${countySelVal}`;
    if (citySelValue !== 'all') finalFilterString += `&city=${citySelValue}`;
    if (starsSelected !== 0) finalFilterString += `&rating=${starsSelected}`;
    console.log('finalFilterString ===', finalFilterString);
    onFilterChange(finalFilterString);
  }, [countySelVal, citySelValue, starsSelected]);

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

  const noFilterActive = countySelVal === 'all' && citySelValue === 'all' && starsSelected === 0;

  return (
    <div>
      {!noFilterActive && (
        <FilterBox className='bg-primary-subtle' title='Active Filters'>
          {countySelVal !== 'all' && <p>Country: {countySelVal}</p>}
          {citySelValue !== 'all' && <p>City: {citySelValue}</p>}
          {starsSelected !== 0 && <p>Rating: more than {starsSelected}</p>}
        </FilterBox>
      )}
      <FilterBox title='Filter by Country'>
        <select
          value={countySelVal}
          onChange={(e) => setCountySelVal(e.target.value)}
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
          value={citySelValue}
          onChange={(e) => setCitySelValue(e.target.value)}
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
