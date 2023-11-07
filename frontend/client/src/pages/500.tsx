import Image from 'next/image';
import Link from 'next/link';
import AccessDenySVG from '../../public/access_denied_re_awnf.svg'

export default function Custom500() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>

        <div>
        <Image
          src={AccessDenySVG}
          width={400}
          height={300}
          alt='Access Denied'
          className='sm-max:hidden mx-auto'
        />
      </div>
          <p className='mb-4 mt-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
          접근이 제한되었습니다.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
          이 페이지에 접근할 권한이 없습니다.
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
