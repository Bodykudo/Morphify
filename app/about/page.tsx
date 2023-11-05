import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morphify - About',
  openGraph: {
    title: 'Morphify - About',
  },
  twitter: {
    title: 'Morphify - About',
  },
};

export default function About() {
  return (
    <div className='space-y-12 text-md md:text-lg text-gray-500 pb-4 md:pb-8 dark:text-gray-300'>
      <p>
        Introducing Morphify, your gateway to seamless multimedia conversion.
        With Morphify, you can effortlessly transform images, audio files, and
        videos, all without spending a dime. Say goodbye to limitations and
        welcome endless creative possibilities with open arms!
      </p>
      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🖼️ Picture Perfect:
        </h2>
        <p>
          Unleash your artistic flair with our image conversion tool. Whether
          you need to resize, crop, rotate, or convert formats, we&apos;ve got
          you covered. From converting JPEG to PNG, and more, effortlessly
          enhance your visual content.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🎵 Audio Alchemy:
        </h2>
        <p>
          Elevate your audio projects to new heights! With Morphify&apos;s audio
          conversion prowess, switch between various formats like a pro – MP3,
          WAV, or AAC, you name it. Fine-tune bitrates, trim, or merge audio
          files to craft the perfect sound.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🎥 Video Magic:
        </h2>
        <p>
          Action! Edit and transcode videos without constraints. From altering
          video formats to slicing and dicing clips, you can create stunning
          video content for any platform or purpose.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🚀 Limitless Freedom:
        </h2>
        <p>
          At Morphify, we believe in empowering your creativity without hidden
          fees or restrictions. Convert as many images, audio files, and videos
          as you desire, and it&apos;s all on the house.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🌐 Anytime, Anywhere:
        </h2>
        <p>
          Access Morphify from any device with an internet connection. Whether
          you&apos;re on your computer, tablet, or smartphone, our platform is
          always at your fingertips.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🔒 Privacy First:
        </h2>
        <p>
          Your multimedia files are treated with the utmost care. We prioritize
          your privacy and data security, ensuring your files remain yours
          alone.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          💡 User-Friendly Interface:
        </h2>
        <p>
          Our intuitive interface caters to both beginners and experts, making
          the conversion process a breeze. No technical expertise required!
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          📈 Ever-Expanding:
        </h2>
        <p>
          We&apos;re committed to staying ahead of the curve. Expect frequent
          updates and new features to keep your multimedia experience fresh and
          thrilling.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          🌟 It&apos;s Free, It&apos;s Mighty, It&apos;s Morphify:
        </h2>
        <p>
          Unlock the freedom to convert images, audio, and video without
          constraints. Elevate your multimedia projects with Morphify&apos;s
          boundless potential.
        </p>
      </div>

      <p>
        Join the ranks of content creators, professionals, and enthusiasts who
        are transforming their multimedia work. Embark on your creative journey
        today and shine brighter than ever!
      </p>
    </div>
  );
}
