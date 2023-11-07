import Image from 'next/image';
import Link from 'next/link';
import AccessErrorSVG from '../../public/undraw_page_not_found_re_e9o6.svg'

export default function Custom500() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
        <div>
        <Image
          src={AccessErrorSVG}
          width={400}
          height={300}
          alt='Access Denied'
          className='sm-max:hidden mx-auto'
        />
      </div>
          <p className='mb-4 mt-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
            무엇인가 잘못 되었습니다!
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            죄송하지만 찾고자하는 페이지를 찾지 못했습니다. 다른 페이지를 방문해 주세요.
          </p>
          <Link
            href='/'
            className='inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 '
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
