//

import { useEffect, useState } from 'react';
import { countriesUrl } from '../../config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CountryObjType } from '../../types/types';
import { Link } from 'react-router-dom';

export default function CountriesPage() {
  //
  const [countriesArr, setCountriesArr] = useState<CountryObjType[] | null>(null);
  useEffect(() => {
    getCountries(countriesUrl);
  }, []);

  function getCountries(url: string) {
    // axios - parsiusti countries ir atvaizduoti korteliu pavidalu
    axios
      .get(url)
      .then((resp: AxiosResponse) => {
        // console.log('resp.data ===', resp.data);
        setCountriesArr(resp.data);
      })
      .catch((error: AxiosError) => {
        console.warn('ivyko klaida:', error.response?.data);
      });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>CountriesPage</h1>
        <p>Welcome to our CountriesPage</p>
        <ul className='unlisted row'>
          {countriesArr?.map((cObj) => (
            <li className='col-12 col-md-6 col-xl-4' key={cObj.id}>
              <Link className='d-block' to={'#'}>
                <img className='cImg' src={'/img/' + cObj.image_main} alt={cObj.name} />
                <h3 className='cName'>{cObj.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
