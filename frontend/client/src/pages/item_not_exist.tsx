import Image from 'next/image';
import Link from 'next/link';
import ItemNoSVG from '../../public/undraw_empty_re_opql.svg';

export default function Custom500() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <Image
            src={ItemNoSVG}
            width={400}
            height={300}
            alt='Access Denied'
            className='sm-max:hidden mx-auto'
          />
          <p className='mb-4 mt-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
            해당 내용이 존재하지 않습니다.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            MyNFT에 접근했을 경우 스탬프 이벤트에 신청하거나 NFT를 민팅하지 않을
            경우 MyNFT에 접근할 수 없습니다.
            <br />
            MyNFT를 활성화시키기 위해 스템프 이벤트를 신청하거나 NFT를
            민팅하세요.
          </p>
          <Link
            href='/'
            className='inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
