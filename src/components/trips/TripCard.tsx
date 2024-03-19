import { Link } from 'react-router-dom';
import { TripObjType } from '../../types/types';
import { getNiceDate } from '../../utils/helpers';
import Rating from '../UI/Rating';

type TripCardProps = {
  item: Omit<TripObjType, 'description'>;
};

export default function TripCard({ item }: TripCardProps) {
  return (
    <div className='border p-4 rounded tripGrid'>
      <img src={item.image_main} alt={item.name} className='img-fluid' />
      <div className='info'>
        <h3 className='h4'>{item.name}</h3>
        <p className='lead'>{getNiceDate(item.date)}</p>
        <p>
          <span className='fw-bold'>{item.country}</span> - {item.city}
        </p>
        <Rating rating={item.rating} />
        <p className=''>{item.price} eur</p>
        <Link to={`/trips/${item.id}`}>
          <button className='btn btn-info'>Read more</button>
        </Link>
      </div>
    </div>
  );
}
