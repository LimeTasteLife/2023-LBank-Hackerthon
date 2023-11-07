import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MainSeriesCard from './MainSeriesCard';
import MainSeriesCard1 from './MainSeriesCard1';
import MainSeriesCard2 from './MainSeriesCard2';

const MainSeries = ({ recentSeries }: any) => {

  console.log('recentSeries', recentSeries);
  return (
    <Swiper
     
      spaceBetween={30}
      loop={true}
      effect={'fade'}
      autoplay={{
        delay: 2500, 
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className='mySwiper'
    >

{recentSeries?.map((item: any, index: any) => (
                
                <SwiperSlide key={index}>
        <MainSeriesCard item={item}/>
      </SwiperSlide>
              
            ))}
      
      
    </Swiper>
  );
};

export default MainSeries;
