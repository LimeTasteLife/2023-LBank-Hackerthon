/* eslint-disable @next/next/no-img-element */

import { CldUploadWidget } from 'next-cloudinary';
import { motion } from 'framer-motion';

import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const NFTImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    console.log('result:', result.info.secure_url);
    const updatedValue = Array.isArray(value)
      ? [...value, result.info.secure_url]
      : [result.info.secure_url];
    onChange(updatedValue);
  };

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <>
      <label
        htmlFor='brand'
        className='block mb-2 text-md font-medium text-gray-900'
      >
        NFT 사진 등록
      </label>

      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
          resourceType: 'image',
          maxFileSize: 2 * 1024 * 1024,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className='relative flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 min-h-[200px]  hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                {value ? (
                  <div className='absolute inset-0 w-full h-full'>
                    <Image
                      fill
                      src={value[0]}
                      style={{ objectFit: 'cover' }}
                      alt='NFT Image'
                    />
                  </div>
                ) : (
                  <>
                    <TbPhotoPlus size={50} className='z-3 mb-3' />
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>사진 업로드하기</span>
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      SVG, PNG, JPG or GIF (MAX. 2MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>

      <p className='text-sm leading-relaxed mt-1 text-slate-500'>
        * 한장의 사진을 선택해주세요. 해당 사진이 티켓 NFT 이미지가 됩니다.
      </p>
      {/* <p className='text-sm leading-relaxed text-slate-500 mt-1 '>
        * 첫번째 사진이 스탬프 보드가 됩니다.
      </p> */}
    </>
  );
};

export default NFTImageUpload;
