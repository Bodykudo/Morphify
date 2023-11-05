import Dropzone from '@/components/Dropzone';

export default function Home() {
  return (
    <div className='space-y-16 pb-8'>
      <div className='space-y-6'>
        <h1 className='text-3xl md:text-5xl font-medium text-center dark:text-gray-200'>
          Transforming Media, Empowering You
        </h1>
        <p className='text-gray-400 text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52'>
          Your one-stop solution for hassle-free file conversion. Convert
          images, videos, and audio files effortlessly and for free. No
          limitations, just seamless transformation of your media into the
          format you need. Use{' '}
          <span className='text-sky-600 font-medium'>Morphify</span> today and
          unlock the power of versatile file conversion.
        </p>
      </div>

      <Dropzone />
    </div>
  );
}
