type RatingProps = {
  rating: number;
  max?: number;
};

export default function Rating({ rating, max = 5 }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const starClass = i < rating ? 'bi-star-fill' : 'bi-star';
    return <i key={i} className={`bi ${starClass} text-warning`}></i>;
  });
  return <div>{stars}</div>;
}
