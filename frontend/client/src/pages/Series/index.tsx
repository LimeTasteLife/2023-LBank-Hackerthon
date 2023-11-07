import HeadlineCards from '@/components/SeriesPage/HeadlineCards';
import MainSeries from '@/components/SeriesPage/MainSeries';

import { ExampleSeries } from '@/constants';
import axios from 'axios';

export async function getServerSideProps() {
  let allSeries: any = '';

  try {
    const response = await axios.get(`http://13.232.70.72:80/series/all`);
    console.log(response);

    // Access the response data
    allSeries = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    allSeries = null;
  }

  return {
    props: { transaction: { ...allSeries } },
  };
}

const index = (props: { transaction: any }) => {
  const allSeries = props.transaction;

  // console.log('transaction', allSeries);

  

  const array1 = [];
  const array2 = [];

  for (const key in allSeries) {
    if (key === '0' || key === '1' ) {
      array1.push(allSeries[key]);
    } else  {
      array2.push(allSeries[key]);
    }
  }

  console.log('array1', array1);
  console.log('array2', array2);

  

  // allSeries[0].seriesInfo

  return (
    <div className='mb-20'>
      <MainSeries recentSeries={array1} />

      <div className='flex relative flex-col md:flex-row items-center p-5  rounded-b-2xl'>
        <div className='absolute top-30 left-0 w-full h-96 bg-gradient-to-br from-green-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50'></div>
        <HeadlineCards laterSeries={array2} />
      </div>
    </div>
  );
};

export default index;
