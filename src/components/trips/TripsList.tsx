import { TripObjType } from '../../types/types';
import TripCard from './TripCard';

//
type TripsListProps = {
  list?: (TripObjType & { email?: string })[] | null;
  archive?: boolean;
};

export default function TripsList({ list, archive }: TripsListProps) {
  return (
    <ul className='unlisted tripsList'>
      {list?.map((tObj) => (
        <li className='mb-4' key={tObj.id}>
          <TripCard item={tObj} archive={archive} />
        </li>
      ))}
    </ul>
  );
}
