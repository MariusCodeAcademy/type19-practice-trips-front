//

import { useEffect, useState } from 'react';
import { countriesUrl } from '../../config';
import axios from 'axios';

export default function CountriesPage() {
  //
  const [countriesArr, setCountriesArr] = useState(null);

  useEffect(() => {
    getCountries(countriesUrl);
  }, []);

  function getCountries(url: string) {
    // axios
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>CountriesPage</h1>
        <p>Welcome to our CountriesPage</p>
      </div>
    </div>
  );
}
