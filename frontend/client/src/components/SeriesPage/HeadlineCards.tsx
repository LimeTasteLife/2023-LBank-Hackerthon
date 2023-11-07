import React from 'react';
import SeriesCard from './SeriesCard';
import { seriesMintInfo } from '@/constants/category';

const HeadlineCards = ({laterSeries}: any) => {

  // console.log('laterSeries', laterSeries)

  const example = [seriesMintInfo]
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-2 grid-cols-1 gap-6'>

  

      {laterSeries?.map((item: any, index: any) => (
                
                  <SeriesCard item={item} key={index} />
                
              ))}
   
    
    </div>
  );
};

export default HeadlineCards;
