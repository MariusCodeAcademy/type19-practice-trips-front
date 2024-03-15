//

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TripObjType } from '../../types/types';
import { beBaseUrl } from '../../config';
import axios from 'axios';

type tripParam = {
  readonly tripId: string;
};

export default function SingleTripPage() {
  const { tripId } = useParams() as tripParam;

  const [currentTrip, setCurrentTrip] = useState<TripObjType | null>(null);
  // parsisiusti Trip objekta

  useEffect(() => {
    const cUrl = `${beBaseUrl}/trips/${tripId}`;
    console.log('cUrl ===', cUrl);
    getTrip(cUrl);
  }, [tripId]);

  async function getTrip(url: string) {
    try {
      const resp = await axios.get(url);
      console.log('resp ===', resp);
      setCurrentTrip(resp.data);
    } catch (error) {
      console.warn('getTrip', error);
    }
    //
  }

  // irasyti i state,

  // sugeneruoti html/jsx

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>{currentTrip?.name}</h1>
        <p className='lead'>{currentTrip?.date}</p>
      </div>
    </div>
  );
}
