//

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TripObjType } from '../../types/types';
import { beBaseUrl } from '../../config';
import axios from 'axios';
import { getNiceDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

type tripParam = {
  readonly tripId: string;
};

export default function SingleTripPage() {
  const { tripId } = useParams() as tripParam;

  const [currentTrip, setCurrentTrip] = useState<TripObjType | null>(null);

  // parsisiusti Trip objekta

  const cUrl = `${beBaseUrl}/trips/${tripId}`;
  useEffect(() => {
    console.log('cUrl ===', cUrl);
    getTrip(cUrl);
  }, [cUrl]);

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
  const navigate = useNavigate();
  async function handleDeleteTrip() {
    try {
      const resp = await axios.delete(cUrl);
      console.log('resp ===', resp);
      toast.success(`${currentTrip?.name} was deleted`);
      navigate('/trips');
    } catch (error) {
      console.warn('error ===', error);
      console.warn('klaida trinant');
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='left'>
          <img
            className='img-fluid'
            src={'/img/' + currentTrip?.image_main}
            alt={currentTrip?.name}
          />
        </div>
        <div className='right'>
          <h1 className='display-2'>{currentTrip?.name}</h1>
          <p className='lead'>{getNiceDate(currentTrip?.date || '')}</p>
          <p>
            <span className='fw-bold'>{currentTrip?.country}</span> - {currentTrip?.city}
          </p>
          <p className=''>{currentTrip?.description}</p>
          <div className='control d-flex gap-2'>
            <button className='btn btn-secondary'>Go back</button>
            <button onClick={handleDeleteTrip} className='btn btn-danger'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
