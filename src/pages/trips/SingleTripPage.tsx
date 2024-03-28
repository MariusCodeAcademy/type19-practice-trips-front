//

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TripObjType } from '../../types/types';
import { beBaseUrl } from '../../config';
import axios, { AxiosError } from 'axios';
import { getNiceDate } from '../../utils/helpers';
import toast from 'react-hot-toast';
import SwiperTest from '../../components/UI/SwiperTest';
import SinglePageSwiper from '../../components/UI/SinglePageSwiper';
import { useAuthCtx } from '../../store/AuthProvider';

type tripParam = {
  readonly tripId: string;
};

export default function SingleTripPage() {
  const { tripId } = useParams() as tripParam;

  const { email, userId } = useAuthCtx();

  const [currentTrip, setCurrentTrip] = useState<(TripObjType & { email: string }) | null>(null);
  // console.log('currentTrip ===', currentTrip);
  // const isOwner = email === currentTrip?.email;
  const isOwner = true;

  // parsisiusti Trip objekta

  const cUrl = `${beBaseUrl}/trips/${tripId}`;
  useEffect(() => {
    // console.log('cUrl ===', cUrl);
    getTrip(cUrl);
  }, [cUrl]);

  async function getTrip(url: string) {
    try {
      const resp = await axios.get(url);
      // console.log(resp.data);
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
      const resp = await axios.delete(cUrl, { data: { userId } });
      // console.log('resp ===', resp);
      toast.success(`${currentTrip?.name} was deleted`);
      navigate('/trips');
    } catch (error) {
      const axiosErr = error as AxiosError;
      console.warn('axiosErr.response?.data ===', axiosErr.response?.data);
      console.warn('klaida trinant');
    }
  }

  return (
    <div>
      <div className='container singleTripPage'>
        <div className='left '>
          <SinglePageSwiper
            images={[
              currentTrip?.image_main || '',
              currentTrip?.images_1 || '',
              currentTrip?.images_2 || '',
              currentTrip?.images_3 || '',
            ]}
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
            <Link to={'/trips'}>
              <button className='btn btn-secondary'>Go back</button>
            </Link>
            {isOwner && (
              <button onClick={handleDeleteTrip} className='btn btn-danger'>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
