//

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TripObjType } from '../../types/types';
import { beBaseUrl } from '../../config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getNiceDate } from '../../utils/helpers';
import toast from 'react-hot-toast';
import SwiperTest from '../../components/UI/SwiperTest';
import SinglePageSwiper from '../../components/UI/SinglePageSwiper';
import { useAuthCtx } from '../../store/AuthProvider';
import BIcon from '../../components/UI/BIcon';

type tripParam = {
  readonly tripId: string;
};

export default function SingleTripPage() {
  const { tripId } = useParams() as tripParam;

  const { email, userId } = useAuthCtx();

  const [currentTrip, setCurrentTrip] = useState<
    (TripObjType & { email: string; likes: number }) | null
  >(null);
  const [likedAlready, setLikedAlready] = useState(false);
  console.log('currentTrip ===', JSON.stringify(currentTrip, null, 2));
  // const isOwner = email === currentTrip?.email;
  const isOwner = true;

  // parsisiusti Trip objekta

  const cUrl = `${beBaseUrl}/trips/${tripId}`;
  useEffect(() => {
    // console.log('cUrl ===', cUrl);
    getTrip(cUrl);
    didUserLikeThePost();
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

  function handleLike() {
    if (!currentTrip) return;
    // nusiusti objekta i back
    const newLike: { trip_id: number; user_id: number } = {
      trip_id: currentTrip.id,
      user_id: userId,
    };

    // console.log('newLike ===', newLike);
    axios
      .post(`${beBaseUrl}/likes`, newLike)
      .then((resp) => {
        console.log('resp ===', resp.data);
        setLikedAlready(true);
      })
      .catch((error) => {
        console.warn('newLike ivyko klaida:', error);
      });
  }

  function didUserLikeThePost() {
    const path = `${beBaseUrl}/likes/user/${userId}/${tripId}`;
    axios
      .get(path)
      .then((resp: AxiosResponse<boolean>) => {
        console.log('resp ===', resp);
        setLikedAlready(resp.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
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
          <p>Likes: {currentTrip?.likes || 0}</p>
          <p>
            <span className='fw-bold'>{currentTrip?.country}</span> - {currentTrip?.city}
          </p>
          <p className=''>{currentTrip?.description}</p>
          <div className='control d-flex gap-2 align-items-start'>
            <Link to={'/trips'}>
              <button className='btn btn-secondary'>Go back</button>
            </Link>
            {isOwner && (
              <button onClick={handleDeleteTrip} className='btn btn-danger'>
                Delete
              </button>
            )}
            <button disabled={likedAlready} onClick={handleLike} className='btn btn-outline-dark'>
              <BIcon className='fs-6'>bi-hand-thumbs-up</BIcon>
              {!likedAlready ? 'Like' : 'You liked this post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
