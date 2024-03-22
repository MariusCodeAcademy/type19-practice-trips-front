// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

type SinglePageSwiperProps = {
  images: string[];
};

export default function SinglePageSwiper({ images }: SinglePageSwiperProps) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      {images
        .filter((imgUrl) => imgUrl)
        .map((imgUrl, i) => (
          <SwiperSlide key={i}>
            <img className='slideImg' src={'/img/' + imgUrl} alt={'town'} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
