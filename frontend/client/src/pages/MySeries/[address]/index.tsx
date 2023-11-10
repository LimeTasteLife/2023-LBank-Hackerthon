import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import { User } from '@prisma/client';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Card, CardBody, CardFooter, Progress } from '@nextui-org/react';
import Link from 'next/link';
import { testUser } from '@/constants';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('getServerSide33', context.params?.address);
  let userInfo: any = '';

  try {
    // Send GET request using axios
    const response = await axios.get(
      `http://3.110.48.189:80/myseries?account=${context.params?.address}`
    );
    console.log(response);

    // Access the response data
    userInfo = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    userInfo = null;
  }

  // const transaction = await fetch(
  //   `http://3.110.48.189:80/series?id=${context.params?.seriesID}`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (!data.items) {
  //       context.res.writeHead(302, { Location: '/item_not_exist ' });
  //       context.res.end();
  //       return;
  //     }
  //     return data.items;
  //   });

  return {
    props: { transaction: { userInfo } },
  };
}

const Profile = (props: { transaction: any }) => {
  
  const profile = props.transaction;

  console.log('profile', profile.userInfo.type0);
  let NFTCount = 0;

  const userNFTData = profile.userInfo.type0;
  const userDNFTData1 = profile.userInfo.type1;
  const userDNFTData2 = profile.userInfo.type2;

  const totalSeries = userNFTData.length + userDNFTData1.length + userDNFTData2.length 

  // const userNFTData = Object.keys(profile)
  //   .filter((key) => key !== '0')
  //   .map((key: any) => profile[key]);

  // userNFTData.map((item: any) => (NFTCount += item.data.length));

  console.log('profileData', userNFTData);
  // console.log('userNFTData', userNFTData);

  //! offcanvas
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-white '>
      <section className='py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6'>
        <div className='max-w-screen-md mb-8 lg:mb-16'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 '>
            내가 만든 (D)NFT Ticket 을 쉽고 빠르게 관리하세요.
          </h2>
        </div>
        <div className='space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0'>
          <div className='border-2 p-5 rounded-2xl shadow-xl '>
            <h3 className='mb-2 text-xl  font-bold '>발행한 시리즈 개수</h3>

            <p className='text-gray-500 text-xl'>{totalSeries}</p>
          </div>
          <div className='border-2 p-5 rounded-2xl shadow-xl'>
            <h3 className='mb-2 text-xl font-bold  '>Mint한 NFT 개수</h3>
            <p className='text-gray-500 text-xl '>480</p>
          </div>
          <div className='border-2 p-5 rounded-2xl shadow-xl'>
            <h3 className='mb-2 text-xl font-bold  '>총 참여자 수</h3>
            <p className='text-gray-500 text-xl '>23</p>
          </div>
          <div className='border-2 p-5 rounded-2xl shadow-xl'>
            <h3 className='mb-2 text-xl font-bold  '>행위 인증 수</h3>
            <p className='text-gray-500 text-xl '>2</p>
          </div>
        </div>
      </section>

      <section className='relative py-30 sm:px-4'>
        <div className='mx-auto'>
          <div className='relative my-20  flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-lg shadow-orange-300 border-2 border-orange-50 '>
            <span className='absolute inset-0 text-4xl sm:text-5xl font-bold text-orange-50 -mt-11 ml-5'>
              NFT Ticket
            </span>

            <div className='py-10 text-center'>
              <div className='flex flex-wrap w-full justify-around px-4 gap-10 '>
                {userNFTData?.map((item: any, index: any) => (
                  <div className='relative flex justify-center' key={index}>
                    <Card
                      shadow='lg'
                      isPressable
                      onPress={() => console.log('item pressed')}
                    >
                      <CardBody className='overflow-visible p-0'>
                        <Image
                          width={400}
                          height={400}
                          alt='NextUI hero Image'
                          src={item.data[0].image}
                          className='min-w-[400px]'
                        />
                      </CardBody>
                      <CardFooter className='text-md px-4 mx-auto'>
                        <div className=' px-4 mx-auto w-full '>
                          <div className='flex justify-between'>
                            <p className='text-lg'>
                              Series {item.seriesInfo.series / 10} 참여율
                            </p>
                            <p className='text-lg '>
                              (총 50개) {((item.data.length - 1) * 100) / 4}%
                            </p>
                          </div>
                          <Progress
                            aria-label='Music progress'
                            classNames={{
                              base: 'max-w-md',
                              track: 'drop-shadow-md border border-default',
                              indicator:
                                'bg-gradient-to-r from-blue-500 to-green-500',
                              label:
                                'tracking-wider font-medium text-default-600',
                              value: 'text-green-50',
                            }}
                            color='default'
                            size='md'
                            value={((item.data.length - 1) * 100) / 4}
                          />
                        </div>
                      </CardFooter>
                    </Card>

                    <div
                      className='absolute grid grid-rows-2 grid-cols-2 gap-9 top-24'
                      draggable='false'
                    >
                      {item.data[1] ? (
                        <Image
                          src={item.data[1].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[2] ? (
                        <Image
                          src={item.data[2].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[3] ? (
                        <Image
                          src={item.data[3].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[4] ? (
                        <Image
                          src={item.data[4].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='relative mb-20  flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-lg shadow-green-300 border-2 border-green-50 '>
            <span className='absolute inset-0 text-4xl sm:text-5xl font-bold text-green-50 -mt-11 ml-5'>
              Stamp DNFT Ticket
            </span>
            <div className='py-10 text-center'>
              <div className='flex flex-wrap w-full justify-around px-4 gap-10 '>
                {userDNFTData1?.map((item: any, index: any) => (
                  <div className='relative flex justify-center' key={index}>
                    <Card
                      shadow='lg'
                      isPressable
                      onPress={() => console.log('item pressed')}
                    >
                      <CardBody className='overflow-visible p-0'>
                        <Image
                          width={400}
                          height={400}
                          alt='NextUI hero Image'
                          src={item.data[0].image}
                          className='min-w-[400px]'
                        />
                      </CardBody>
                      <CardFooter className='text-md px-4 mx-auto'>
                        <div className=' px-4 mx-auto w-full '>
                          <div className='flex justify-between'>
                            <p className='text-lg'>
                              Series {item.seriesInfo.series / 10} 참여율
                            </p>
                            <p className='text-lg '>
                              (총 100개) {((item.data.length - 1) * 100) / 4}%
                            </p>
                          </div>
                          <Progress
                            aria-label='Music progress'
                            classNames={{
                              base: 'max-w-md',
                              track: 'drop-shadow-md border border-default',
                              indicator:
                                'bg-gradient-to-r from-blue-500 to-green-500',
                              label:
                                'tracking-wider font-medium text-default-600',
                              value: 'text-green-50',
                            }}
                            color='default'
                            size='md'
                            value={((item.data.length - 1) * 100) / 4}
                          />
                          <Table
                            removeWrapper
                            aria-label='Example static collection table'
                          >
                            <TableHeader>
                              <TableColumn>Board</TableColumn>
                              <TableColumn>Stamp1</TableColumn>
                              <TableColumn>Stamp2</TableColumn>
                              <TableColumn>Stamp4</TableColumn>
                              <TableColumn>Stamp5</TableColumn>
                            </TableHeader>
                            <TableBody>
                              <TableRow key='1'>
                                <TableCell>25</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>6</TableCell>
                                <TableCell>9</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardFooter>
                    </Card>

                    <div
                      className='absolute grid grid-rows-2 grid-cols-2 gap-9 top-24'
                      draggable='false'
                    >
                      {item.data[1] ? (
                        <Image
                          src={item.data[1].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[2] ? (
                        <Image
                          src={item.data[2].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[3] ? (
                        <Image
                          src={item.data[3].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[4] ? (
                        <Image
                          src={item.data[4].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='relative mb-20  flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-lg shadow-purple-300 border-2 border-purple-500 '>
            <span className='absolute inset-0 text-4xl sm:text-5xl font-bold text-purple-500 -mt-11 ml-5'>
              Series DNFT Ticket
            </span>
            <div className='py-10 text-center'>
              <div className='flex flex-wrap w-full justify-around px-4 gap-10 '>
                {userDNFTData2?.map((item: any, index: any) => (
                  <div className='relative flex justify-center' key={index}>
                    <Card
                      shadow='lg'
                      isPressable
                      onPress={() => console.log('item pressed')}
                    >
                      <CardBody className='overflow-visible p-0'>
                        <Image
                          width={400}
                          height={400}
                          alt='NextUI hero Image'
                          src={item.data[0].image}
                          className='min-w-[400px]'
                        />
                      </CardBody>
                      <CardFooter className='text-md px-4 mx-auto'>
                        <div className=' px-4 mx-auto w-full '>
                          <div className='flex justify-between'>
                            <p className='text-lg'>
                              Series {item.seriesInfo.series / 10} 참여율
                            </p>
                            <p className='text-lg '>
                              (총 100개) {((item.data.length - 1) * 100) / 4}%
                            </p>
                          </div>
                          <Progress
                            aria-label='Music progress'
                            classNames={{
                              base: 'max-w-md',
                              track: 'drop-shadow-md border border-default',
                              indicator:
                                'bg-gradient-to-r from-blue-500 to-green-500',
                              label:
                                'tracking-wider font-medium text-default-600',
                              value: 'text-green-50',
                            }}
                            color='default'
                            size='md'
                            value={((item.data.length - 1) * 100) / 4}
                          />
                          <Table
                            removeWrapper
                            aria-label='Example static collection table'
                          >
                            <TableHeader>
                              <TableColumn>Lev. 1</TableColumn>
                              <TableColumn>Lev. 2</TableColumn>
                              <TableColumn>Lev. 3</TableColumn>
                              <TableColumn>Lev. 4</TableColumn>
                              <TableColumn>Lev. 5</TableColumn>
                            </TableHeader>
                            <TableBody>
                              <TableRow key='1'>
                                <TableCell>25</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>6</TableCell>
                                <TableCell>9</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardFooter>
                    </Card>

                    <div
                      className='absolute grid grid-cols-4 gap-2 bottom-40'
                      draggable='false'
                    >
                      {item.data[1] ? (
                        <Image
                          src={item.data[1].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[2] ? (
                        <Image
                          src={item.data[2].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[3] ? (
                        <Image
                          src={item.data[3].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                      {item.data[4] ? (
                        <Image
                          src={item.data[4].image}
                          alt='stamp1'
                          width={90}
                          height={90}
                          className='rounded-xl shadow-2xl'
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
