import { ExampleSeries } from '@/constants';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
  Avatar,
} from '@nextui-org/react';

import Link from 'next/link';
import { HeartIcon } from '../HeartIcon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SeriesCard = ({ item }: any) => {


  const truncateHexAddress = (hexAddress: string) => {
    const prefix = hexAddress.slice(0, 4); // Extract the '0x' prefix
    const truncatedAddress =
      hexAddress.slice(2, 4) + '...' + hexAddress.slice(-4);
    return prefix + truncatedAddress;
  };


  console.log('item1', item);
  const router = useRouter();

  const [liked, setLiked] = useState(false);

  return (
    <Card
      isPressable
      onPress={() => router.push(`/Series/${item.seriesInfo.series / 10}`)}
      isBlurred
      className='border-none bg-background/60 max-w-[800px] relative'
      shadow='md'
    >
      <CardBody>
        <div className=' grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
          <div className='col-span-6 md:col-span-4'>
            <Image
              src={item?.data[0].image}
              alt='stamp1'
              width={400}
              height={400}
              className='rounded-xl'
            />
          </div>

          <div className='flex flex-col col-span-6 md:col-span-8'>
            <div className='flex justify-between items-start'>
              <div className='flex flex-col gap-0'>
                <span className='absolute flex min-w-max text-gray font-semibold  -top-[50px] -right-[0px] opacity-20  leading-0'>
                  <span className='text-[130px]'>
                    #{item?.seriesInfo.series / 10}
                  </span>
                </span>
                <a
                  href='#'
                  className='justify-between w-fit flex items-center px-1 pr-4 mb-7 text-sm text-gray-700 bg-green-400 rounded-full hover:bg-gray-200 '
                >
                  <Avatar
                    isBordered
                    color='success'
                    src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                    className=' mr-3'
                  />
                  <span className='text-md text-white text-semibold '>
                    {truncateHexAddress(item?.seriesInfo.owner)}
                  </span>
                </a>
                <h1 className='text-xl font-medium mt-2 mb-3'>
                  {item?.seriesInfo.title}
                </h1>
                <p className='text-small text-foreground/80'>
                  {' '}
                  {item?.seriesInfo.description}
                </p>
              </div>
            </div>

            <div className='flex flex-col mt-3 gap-1'>
              <Progress
                aria-label='Music progress'
                classNames={{
                  indicator: 'bg-green-600 dark:bg-white',
                  track: 'bg-default-500/30',
                }}
                color='default'
                size='sm'
                value={ 
                  item?.seriesInfo.applyCount * (100 / Number(item?.seriesInfo.quantity))
                }
              />
              <div className='flex justify-between'>
                <p className='text-small'>{item?.seriesInfo.applyCount}명 참여 완료</p>
                <p className='text-small text-foreground/50'>
                  최대 {item?.seriesInfo.quantity}명
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SeriesCard;

{
  /* <div style={{ perspective: 2000 }}>
<motion.div
  style={{ x, y, rotateX, rotateY, z: 100 }}
  drag
  dragElastic={0.18}
  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
  whileTap={{ cursor: 'grabbing' }}
  className='w-[426px] min-h-[600px] bg-[#e3e2df] rounded-[30px] border-[4px] border-white cursor-grab relative'
>
  
  <Image
        src='/NFTImages/incheon1.jpeg'
        alt='stamp1'
        width={100}
        height={100}
        
      />

  <motion.div
  style={{x, y, rotateX, rotateY, z:100000}}
  className='absolute -right-20 w-fit'>
    <div className='grid grid-rows-2 grid-cols-2 gap-4' draggable='false'>
      <Image
        src='/NFTImages/incheon1.jpeg'
        alt='stamp1'
        width={100}
        height={100}
        
      />
      <Image
        src='/NFTImages/incheon1.jpeg'
        alt='stamp1'
        width={100}
        height={100}
      />
      <Image
        src='/NFTImages/incheon1.jpeg'
        alt='stamp1'
        width={100}
        height={100}
      />
      <Image
        src='/NFTImages/incheon1.jpeg'
        alt='stamp1'
        width={100}
        height={100}
      />
    </div>
  </motion.div>
</motion.div>
</div> */
}
