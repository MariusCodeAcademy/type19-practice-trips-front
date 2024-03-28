import { Link } from 'react-router-dom';
import { TripObjType, UserObjType } from '../../types/types';
import { getNiceDate } from '../../utils/helpers';
import Rating from '../UI/Rating';
import cl from 'classnames';
import { useAuthCtx } from '../../store/AuthProvider';
import Button from '../UI/Button';

type TripCardProps = {
  item: Omit<TripObjType, 'description'> & { email?: string };
  archive?: boolean;
};

export default function TripCard({ item, archive }: TripCardProps) {
  const { email } = useAuthCtx();

  return (
    // <div className={`border p-4 rounded tripGrid ${email === item.email ? 'bg-dark-subtle' : ''} `}>
    <div className={cl('border p-4 rounded tripGrid', { 'bg-dark-subtle': email === item.email })}>
      <img src={'/img/' + item.image_main} alt={item.name} className='img-fluid' />
      <div className='info'>
        <h3 className='h4'>{item.name}</h3>
        <p className='lead'>{getNiceDate(item.date)}</p>
        <p className=''>{item.email}</p>
        <p>
          <span className='fw-bold'>{item.country}</span> - {item.city}
        </p>
        <Rating rating={item.rating} />
        <p className=''>{item.price} eur</p>
        {!archive && (
          <Link to={`/trips/${item.id}`}>
            <Button outline>Read more</Button>
            {/* <button className='btn btn-info'>Read more</button> */}
          </Link>
        )}
        {archive && <Button secondary>Deleted, Undelete?</Button>}
      </div>
    </div>
  );
}
