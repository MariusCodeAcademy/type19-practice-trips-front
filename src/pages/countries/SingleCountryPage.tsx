//

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CountryObjType } from '../../types/types';
import { countriesUrl } from './../../config';
import axios, { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { getNiceDate } from '../../utils/helpers';

export default function SingleCountryPage() {
  // reikalingas sitos salies kuria atvaizduojam id
  const { countryId } = useParams() as { countryId: string };
  console.log('countryId ===', countryId);
  const [currentCountry, setCurrentCountry] = useState<CountryObjType | null>(null);
  // paarsisiusti sali
  const currentCountryUrl = `${countriesUrl}/${countryId}`;
  useEffect(() => {
    getData(currentCountryUrl);
  }, [currentCountryUrl]);

  function getData(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse<CountryObjType>) => {
        console.log('resp.data ===', resp.data);
        setCurrentCountry(resp.data);
      })
      .catch((error: AxiosError) => {
        console.warn('ivyko klaida:', error);
        console.warn('ivyko klaida:', error.response?.data);
      });
  }

  return (
    <div>
      <div className='container'>
        <img
          className='img-fluid max-h-400 cSingleImage'
          src={'/img/' + currentCountry?.image_main}
          alt={currentCountry?.name}
        />
        <h1 className='display-2'>{currentCountry?.name}</h1>
        <h2 className='h4'>Description:</h2>
        <p className='lead'>{currentCountry?.description}</p>
        <p>Created: {getNiceDate(currentCountry?.created_at || '0')}</p>
      </div>
    </div>
  );
}
