import HeadlineCards from '@/components/SeriesPage/HeadlineCards';
import MainSeries from '@/components/SeriesPage/MainSeries';

import { ExampleSeries } from '@/constants';
import axios from 'axios';

export async function getServerSideProps() {
  let allSeries: any = '';

  try {
    const response = await axios.get(`http://3.110.48.189:80/series/all`);
    console.log(response);

    // Access the response data
    allSeries = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    allSeries = null;
  }

  return {
    props: { transaction: { allSeries } },
  };
}

const index = (props: { transaction: any }) => {
  const allSeries = props.transaction;

  // const allSeries = ExampleSeries[0];

  console.log('transaction', allSeries);

  const userNFTData = allSeries.allSeries.type0;
  const userDNFTData1 = allSeries.allSeries.type1;
  const userDNFTData2 = allSeries.allSeries.type2;


  const array1 = [];
  const array2 = [];

  //! 각 티켓 타임에 따라 분리 해야함

  for (const key in allSeries) {
    if (key === '0' || key === '1') {
      array1.push(allSeries[key]);
    } else {
      array2.push(allSeries[key]);
    }
  }

  console.log('array1', array1);
  console.log('array2', array2);

  // allSeries[0].seriesInfo

  return (
    <div className='mb-20 space-y-40'>
      <MainSeries recentSeries={userDNFTData2} />

      <div className='flex  relative flex-col md:flex-row items-center p-5 rounded-b-2xl'>
        <h1 className='mb-4 mx-auto text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-red-400'>
            NFT Ticket
          </span>
        </h1>

        <div className='absolute top-30 left-0 w-full h-96 bg-gradient-to-br from-red-400 to-[#d19900] rounded-md filter blur-3xl opacity-50 -z-50'></div>
        <HeadlineCards laterSeries={userNFTData} />
      </div>
      <div className='flex relative flex-col md:flex-row items-center p-5  rounded-b-2xl'>
        <h1 className='mb-4 mx-auto text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-500'>
            Stamp DNFT Ticket
          </span>
        </h1>
        <div className='absolute top-30 left-0 w-full h-96 bg-gradient-to-br from-green-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50'></div>
        <HeadlineCards laterSeries={userDNFTData1} />
      </div>
      <div className='flex relative flex-col md:flex-row items-center p-5  rounded-b-2xl'>
        <h1 className='mb-4 mx-auto text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-purple-500'>
            Charater DNFT Ticket
          </span>
        </h1>
        <div className='absolute top-30 left-0 w-full h-96 bg-gradient-to-br from-blue-400 to-[#7300d1] rounded-md filter blur-3xl opacity-50 -z-50'></div>
        <HeadlineCards laterSeries={userDNFTData2} />
      </div>
    </div>
  );
};

export default index;
