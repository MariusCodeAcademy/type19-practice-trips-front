//

import { useEffect, useState } from 'react';
import { tripsUrl } from '../../config';
import axios from 'axios';
import TripsList from '../../components/trips/TripsList';
import { TripObjType } from '../../types/types';

export default function TripsArchive() {
  // parsiusti visas istrintas keliones
  const tripsArchUrl = `${tripsUrl}/deleted`;
  const [tripsArr, setTripsArr] = useState<(TripObjType & { email: string })[] | null>(null);
  console.log('tripsArr ===', tripsArr);
  useEffect(() => {
    getTrips(tripsArchUrl);
  }, []);

  function getTrips(url: string) {
    // axios - parsiusti countries ir atvaizduoti korteliu pavidalu
    axios
      .get(url)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setTripsArr(resp.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error.response?.data);
      });
  }

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>UserTrips</h1>
        <p>Welcome to our UserTrips</p>
        <TripsList list={tripsArr} archive />
      </div>
    </div>
  );
}
