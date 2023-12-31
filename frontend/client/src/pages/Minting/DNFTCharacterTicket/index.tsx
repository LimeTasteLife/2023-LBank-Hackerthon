import { useCallback, useEffect, useState } from 'react';

import { Control, Controller, useWatch } from 'react-hook-form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import DatePicker from 'tailwind-datepicker-react';
import Modals from './terms_conditions';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import GoogleMaps from '@/components/GoogleMap';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import priceToString from '@/helpers/priceToString';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import confetti from 'canvas-confetti';

import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { useStorage } from '@thirdweb-dev/react';
import { seriesMintInfo } from '@/constants/category';
import { mintDataChar } from '@/helpers/dataschemaChar';
import ImageUploadChar from '@/components/ImageUploadChar/ImageUpload';

// export async function getServerSideProps() {
//   let seriesId;

//   try {
//     // Send GET request using axios
//     const response = await axios.get(`http://3.110.48.189:80/series/last`);
//     console.log('resdewdeponse', response.data);

//     // Access the response data
//     seriesId = response.data.Id;
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     seriesId = null;
//   }

//   return {
//     props: { seriesId: { ...seriesId } },
//   };
// }

const ERC1155 = (props: { seriesId: any }) => {
  const seriesid = props.seriesId;

  const seriesId = Number.isNaN(seriesid) ? Number(seriesid) / 10 : 1;

  console.log('seriesId', seriesId);

  const router = useRouter();

  const { data: session, status } = useSession();
  const user: any = session?.user!;

  const [showFrom, setShowFrom] = useState<boolean>(false);
  const [showTo, setShowTo] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleConfetti = () => {
    confetti({});
  };
  const nonhandleConfetti = () => {};
  const isEmptyObject = {};

  const options = {
    theme: {
      background: '',
      todayBtn: 'bg-purple-400 hover:bg-purple-500',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: '',
      input: 'focus:ring-purple-400 focus:border-purple-400',
      inputIcon: '',
      selected: 'bg-purple-500',
    },
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      series: seriesId,
      title: '',
      benefit: '',
      owner: '',
      useWhere: '',
      quantity: 1,
      useWhenFrom: dayjs(),
      useWhenTo: dayjs(),
      dateCheck: false,
      description: '',

      imageSrc: '',

      stampBoardDesc: '',

      firstStampDesc: '',
      firstStampLat: null,
      firstStampLot: null,
      firstStampAddress: null,

      secondStampDesc: '',
      secondStampLat: null,
      secondStampLot: null,
      secondStampAddress: null,

      thirdStampDesc: '',
      thirdStampLat: null,
      thirdStampLot: null,
      thirdStampAddress: null,

      fourthStampDesc: '',
      fourthStampLat: null,
      fourthStampLot: null,
      fourthStampAddress: null,

      checkbox: [],
    },
  });

  register('dateCheck', {
    validate: () => {
      return (
        watch('useWhenTo') >= watch('useWhenFrom') ||
        'From date must be before To date'
      );
    },
  });
  // ipfs://QmcvTy8gru2Ryso5RDkJq6ujD5138XzgRDn6LkxSks5FZF/0
  // const storage = useStorage();

  const storage = new ThirdwebStorage({
    clientId: 'c6b8e7180c3c42db758973559ad7f50d',
    secretKey: process.env.YOUR_SECRET_KEY, // You can get one from dashboard settings
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(user.address);
    setIsLoading(true);
    console.log('data', data);
    const result = mintDataChar((data = { data }));
    console.log('result', result.data[0]);
    toast.info('IPFS 업로드 준비중');
    const objects = [
      result.data[0],
      result.data[1],
      result.data[2],
      result.data[3],
      result.data[4],
    ];
    const base = 'https://c6b8e7180c3c42db758973559ad7f50d.ipfscdn.io/ipfs';
    const jsonUris = await storage.uploadBatch(objects);

    toast.info('IPFS 업로드 완료');

    console.log('jsonUris : ', base.concat(jsonUris[0].slice(6, -2)));
    const baseUrl = { baseURI: base.concat(jsonUris[0].slice(6, -2)) };

    const address = { minterAddress: user.address };
    const returnedTarget = Object.assign(baseUrl, result);
    const plusAddress = Object.assign(address, returnedTarget);
    console.log('returnedTarget', plusAddress);

    toast.info('ERC1155 NFT Mint 시작');

    // const res = await storage?.upload(objects);
    // console.log('res', res);

    axios
      .post('http://3.110.48.189:80/mint-series', plusAddress)
      .then((response: any) => {
        toast.success('ERC1155 NFT Mint 완료');
        router.push(`/Series/${response.data.seriesId}`);
      })
      .catch((err) => {
        toast.error(`error: ${err}`);

        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // try {
    //   const response = await fetch('http://3.110.48.189:80/mint-series', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(plusAddress),
    //   });
    //   const data = await response.json();
    //   toast.success('ERC1155 NFT Mint 완료');
    //   router.push(`/Series/${data.seriesId}`);
    //   console.log('data', data);
    // } catch (error) {
    //   toast.error(`error: ${error}`);
    //   console.log('Error: ' + error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: string[]) => {
    setValue(id, value);
    console.log('this is', value);
  };

  const firstStampAddress = watch('firstStampAddress');
  const firstStampLat = watch('firstStampLat');
  const firstStampLot = watch('firstStampLot');

  const secondStampAddress = watch('secondStampAddress');
  const secondStampLat = watch('secondStampLat');
  const secondStampLot = watch('secondStampLot');

  const thirdStampAddress = watch('thirdStampAddress');
  const thirdStampLat = watch('thirdStampLat');
  const thirdStampLot = watch('thirdStampLot');

  const fourthStampAddress = watch('fourthStampAddress');
  const fourthStampLat = watch('fourthStampLat');
  const fourthStampLot = watch('fourthStampLot');

  return (
    <>
      <section className='bg-white '>
        <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
          <h2 className='mb-4 text-4xl font-bold text-center text-gray-900'>
            Register My DNFT Character Ticket
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='block mb-2 text-xl font-bold text-gray-900 text-center border-t-5 pt-4 border-purple-500 border-double'>
              1. Series {seriesId} 정보 입력
            </label>

            <div className='grid gap-4 sm:grid-cols-2 '>
              <div className='col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  이름
                </label>
                <input
                  type='text'
                  id='title'
                  {...register('title', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 1,
                      message: '필수적으로 입력해야 합니다.',
                    },
                    maxLength: {
                      value: 100,
                      message: '100자를 넘길 수 없습니다.',
                    },
                  })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5  ${
                    errors.title && 'border-rose-500'
                  }`}
                  placeholder='빠르게 티켓 선점하고 LBank 해커톤에 참여하자!'
                />
                {errors.title?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.title.message.toString()}
                  </p>
                )}
              </div>

              <div className='sm:col-span-1 col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  혜택 명칭 / 액수
                </label>
                <input
                  type='text'
                  {...register('benefit', {
                    required: '필수 입력 사안입니다.',

                    maxLength: { value: 30, message: 'Max length is 30' },
                  })}
                  id='benefit'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5  ${
                    errors.benefit && 'border-rose-500  '
                  }`}
                  placeholder='LBank 해커톤 참여권'
                />
                {errors.benefit?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.benefit.message.toString()}
                  </p>
                )}
              </div>

              <div className='sm:col-span-1 col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  주최 및 주관 사 / 인
                </label>
                <input
                  type='text'
                  {...register('owner', {
                    required: '필수 입력 사안입니다.',

                    maxLength: { value: 30, message: 'Max length is 30' },
                  })}
                  id='owner'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5  ${
                    errors.owner && 'border-rose-500  '
                  }`}
                  placeholder='LBANK'
                />
                {errors.owner?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.owner.message.toString()}
                  </p>
                )}
              </div>
              <div className='sm:col-span-1 col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  혜택 사용처
                </label>
                <input
                  type='text'
                  {...register('useWhere', {
                    required: '필수 입력 사안입니다.',
                    minLength: { value: 2, message: 'Min length is 2' },
                    maxLength: { value: 100, message: 'Max length is 100' },
                  })}
                  id='useWhere'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5  ${
                    errors.useWhere && 'border-rose-500 '
                  }`}
                  placeholder='혜택을 사용할 수 있는 장소'
                />
                {errors.useWhere?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.useWhere.message.toString()}
                  </p>
                )}
              </div>
              <div className='sm:col-span-1 col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  수량
                </label>
                <input
                  type='number'
                  {...register('quantity', {
                    validate: (value) =>
                      value > 0 || '최소 1개 이상이어야 합니다.',
                  })}
                  id='quantity'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5  ${
                    errors.quantity && 'border-rose-500 '
                  }`}
                  placeholder='NFT 수량'
                />
                {errors.quantity?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {JSON.stringify(errors.quantity.message.toString())}
                  </p>
                )}
              </div>

              <div className='sm:col-span-2 col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  유효 기간 설정
                </label>

                <div className='flex items-center w-full'>
                  <div className='relative'>
                    <Controller
                      name='useWhenFrom'
                      control={control}
                      render={({ field: { ref, ...fieldProps } }) => (
                        <DatePicker
                          {...fieldProps}
                          show={showFrom}
                          setShow={(state: boolean) => setShowFrom(state)}
                          options={options}
                        />
                      )}
                    />
                  </div>
                  <span className='mx-4 text-gray-500'>to</span>
                  <div className='relative'>
                    <Controller
                      name='useWhenTo'
                      control={control}
                      render={({ field: { ref, ...fieldProps } }) => (
                        <DatePicker
                          {...fieldProps}
                          show={showTo}
                          setShow={(state: boolean) => setShowTo(state)}
                          options={options}
                        />
                      )}
                    />
                  </div>
                </div>
                {errors.dateCheck?.message && (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.dateCheck.message.toString()}
                  </p>
                )}
              </div>

              <div className='col-span-2'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-md font-medium text-gray-900'
                >
                  설명
                </label>
                <textarea
                  id='description'
                  {...register('description', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-40 ${
                    errors.description && 'border-rose-500 '
                  }`}
                  placeholder='이번 Series에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.description?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.description.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>

              <div className='col-span-2'>
                <label className='block mb-2 text-xl font-bold text-gray-900 text-center border-t-5 pt-4 border-purple-500 border-double'>
                  2. DNFT 정보 입력
                </label>

                <ImageUploadChar
                  onChange={(value) => setCustomValue('imageSrc', value)}
                  value={imageSrc}
                />
              </div>
            </div>

            <label className='block mb-2 mt-5 text-xl font-bold text-gray-900 text-center border-t-3 w-3/4 pt-4 border-purple-500 border-dashed mx-auto'>
              Level - 1 NFT
            </label>

            <div className='grid  sm:grid-cols-2 '>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  설명
                </label>
                <textarea
                  id='stampBoardDesc'
                  {...register('stampBoardDesc', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-30 ${
                    errors.stampBoardDesc && 'border-rose-500 '
                  }`}
                  placeholder='이 NFT에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.stampBoardDesc?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.stampBoardDesc.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>
            </div>

            <label className='block mb-2 mt-5 text-xl font-bold text-gray-900 text-center border-t-3 w-3/4 pt-4 border-purple-500 border-dashed mx-auto'>
              Level - 2 NFT
            </label>

            <div className='grid sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  설명
                </label>
                <textarea
                  id='firstStampDesc'
                  {...register('firstStampDesc', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-30 ${
                    errors.firstStampDesc && 'border-rose-500 '
                  }`}
                  placeholder='이 NFT에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.firstStampDesc?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.firstStampDesc.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='googleMaps'
                  className='block mb-2 text-md font-medium text-gray-900 mt-3'
                >
                  NFT 위치 설정
                </label>

                <GoogleMaps
                  id='1'
                  showSearch={true}
                  latitude={firstStampLat}
                  longitude={firstStampLot}
                  setCustomValue={setCustomValue}
                  detailAddress={firstStampAddress}
                />
              </div>
            </div>

            <label className='block mb-2 mt-5 text-xl font-bold text-gray-900 text-center border-t-3 w-3/4 pt-4 border-purple-500 border-dashed mx-auto'>
              Level - 3 NFT
            </label>

            <div className='grid sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  설명
                </label>
                <textarea
                  id='secondStampDesc'
                  {...register('secondStampDesc', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-30 ${
                    errors.secondStampDesc && 'border-rose-500 '
                  }`}
                  placeholder='이 NFT에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.secondStampDesc?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.secondStampDesc.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='googleMaps'
                  className='block mb-2 text-md font-medium text-gray-900 mt-3'
                >
                  NFT 위치 설정
                </label>

                <GoogleMaps
                  id='2'
                  showSearch={true}
                  latitude={secondStampLat}
                  longitude={secondStampLot}
                  setCustomValue={setCustomValue}
                  detailAddress={secondStampAddress}
                />
              </div>
            </div>

            <label className='block mb-2 mt-5 text-xl font-bold text-gray-900 text-center border-t-3 w-3/4 pt-4 border-purple-500 border-dashed mx-auto'>
              Level - 4 NFT
            </label>

            <div className='grid sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  설명
                </label>
                <textarea
                  id='thirdStampDesc'
                  {...register('thirdStampDesc', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-30 ${
                    errors.thirdStampDesc && 'border-rose-500 '
                  }`}
                  placeholder='이 NFT에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.thirdStampDesc?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.thirdStampDesc.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='googleMaps'
                  className='block mb-2 text-md font-medium text-gray-900 mt-3'
                >
                  NFT 위치 설정
                </label>

                <GoogleMaps
                  id='3'
                  showSearch={true}
                  latitude={thirdStampLat}
                  longitude={thirdStampLot}
                  setCustomValue={setCustomValue}
                  detailAddress={thirdStampAddress}
                />
              </div>
            </div>

            <label className='block mb-2 mt-5 text-xl font-bold text-gray-900 text-center border-t-3 w-3/4 pt-4 border-purple-500 border-dashed mx-auto'>
              Level - 5 NFT
            </label>

            <div className='grid sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label className='block mb-2 text-md font-medium text-gray-900'>
                  설명
                </label>
                <textarea
                  id='fourthStampDesc'
                  {...register('fourthStampDesc', {
                    required: '필수 입력 사안입니다.',
                    minLength: {
                      value: 2,
                      message: '최소 입력 글자수는 2 입니다.',
                    },
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자까지 입력할 수 있습니다.',
                    },
                  })}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-400 focus:border-purple-400  h-30 ${
                    errors.fourthStampDesc && 'border-rose-500 '
                  }`}
                  placeholder='이 NFT에 대한 자세한 내용을 기입해주세요.'
                />
                {errors.fourthStampDesc?.message ? (
                  <p className='text-sm leading-relaxed text-rose-500 dark:text-rose-500'>
                    {errors.fourthStampDesc.message.toString()}
                  </p>
                ) : (
                  <p className='text-sm leading-relaxed text-slate-500'>
                    * 2 ~ 1000 자까지 기입 가능합니다.
                  </p>
                )}
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='googleMaps'
                  className='block mb-2 text-md font-medium text-gray-900 mt-3'
                >
                  NFT 위치 설정
                </label>

                <GoogleMaps
                  id='4'
                  showSearch={true}
                  latitude={fourthStampLat}
                  longitude={fourthStampLot}
                  setCustomValue={setCustomValue}
                  detailAddress={fourthStampAddress}
                />
              </div>
            </div>

            <div className='flex items-center mt-8'>
              <input
                id='link-checkbox'
                type='checkbox'
                value='Terms & Conditions'
                {...register('checkbox', {
                  required: '다음 사항에 동의해주세요.',
                })}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500  focus:ring-2  '
              />
              <label
                htmlFor='link-checkbox'
                className='ml-2 text-sm font-medium text-gray-900 '
              >
                다음에 동의합니다.{' '}
              </label>
              <span className='ml-2 text-sm font-medium text-gray-900 '>
                <Modals onClick={setIsChecked} />
              </span>
            </div>
            {errors.checkbox && (
              <p className='text-sm leading-relaxed text-red-500 '>
                {errors.checkbox.message?.toString()}
              </p>
            )}

            <Button
              // isProcessing={isLoading}
              // gradientDuoTone='redToYellow'
              onPress={
                Object.values(errors).length === 0
                  ? handleConfetti
                  : nonhandleConfetti
              }
              type='submit'
              disableRipple
              className="relative  w-full mt-4 bg-purple-400 overflow-visible rounded-full hover:-translate-y-1  shadow-xl  after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              size='lg'
              isLoading={isLoading}
              disabled={isLoading}
            >
              위의 내용으로 Series와 관련 NFT를 민팅하기
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ERC1155;
