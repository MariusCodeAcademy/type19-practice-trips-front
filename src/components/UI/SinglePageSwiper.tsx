// Import Swiper React components
import { type Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useState } from 'react';

type SinglePageSwiperProps = {
  images: string[];
};

export default function SinglePageSwiper({ images }: SinglePageSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        spaceBetween={24}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='swiperUp mb-2 '>
        {images
          .filter((imgUrl) => imgUrl)
          .map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <img className='slideImg' src={'/img/' + imgUrl} alt={'town'} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={false}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='swiperThumbs'>
        {images
          .filter((imgUrl) => imgUrl)
          .map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <img className='slideThumb' src={'/img/' + imgUrl} alt={'town'} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
