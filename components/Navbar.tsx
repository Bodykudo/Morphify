'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { BsGithub } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { ModeToggle } from './ModeToggle';
import useScreenWidth from '@/hooks/useScreenWidth';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const routes = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
];

export default function Navbar() {
  const pathName = usePathname();
  const width = useScreenWidth();
  const { theme, systemTheme } = useTheme();

  return (
    <nav className='w-full backdrop-blur-md bg-white bg-opacity-30 z-50 fixed border-b border-[#333333] h-24 flex justify-between items-center py-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 dark:bg-dark dark:bg-opacity-30'>
      <Link href='/'>
        {width > 400 ? (
          <Image
            src='/logo.png'
            width={250}
            className='w-auto h-auto'
            height={95}
            alt='Morphify Logo'
          />
        ) : (
          <Image
            src='/icon.png'
            width={60}
            className='w-auto h-auto'
            height={60}
            alt='Morphify Logo'
          />
        )}
      </Link>
      <div className='gap-1 md:gap-2 lg:gap-4 hidden md:flex'>
        {routes.map((route) => (
          <Link href={route.url} key={route.url}>
            <Button
              variant={pathName === route.url ? 'secondary' : 'ghost'}
              className={`font-semibold text-md ${
                pathName === route.url
                  ? 'text-gray-50'
                  : 'text-black dark:text-gray-50 hover:text-white'
              }`}
            >
              {route.name}
            </Button>
          </Link>
        ))}
      </div>

      <div className='md:flex items-center justify-center gap-4 hidden'>
        <Link href='https://github.com/bodykudo/morphify.git' target='_blank'>
          <Button
            variant='default'
            className='rounded-full w-fit bg-sky-600 gap-2 items-center flex hover:bg-sky-600/70'
            size='lg'
          >
            <span>Github Repo</span>
            <span className='text-xl'>
              <BsGithub />
            </span>
          </Button>
        </Link>
        <ModeToggle />
      </div>

      {/* Mobile Nav */}
      <Sheet>
        <div className='flex items-center justify-center gap-4 md:hidden'>
          <ModeToggle />
          <SheetTrigger className='p-3 focus:outline-none'>
            <span className='text-2xl dark:text-gray-50'>
              <AiOutlineMenu />
            </span>
          </SheetTrigger>
        </div>
        <SheetContent className='dark:bg-dark dark:border-dark'>
          <SheetHeader>
            <SheetDescription>
              <div className='w-full flex flex-col items-center justify-between mt-10 space-y-14'>
                <div className='flex flex-col items-center justify-center space-y-6'>
                  <Link href='/'>
                    <Image
                      src='/logo.png'
                      width={250}
                      height={95}
                      className='w-auto h-auto'
                      alt='Morphify Logo'
                    />
                  </Link>
                  {routes.map((route) => (
                    <Link href={route.url} key={route.url}>
                      <Button
                        variant={pathName === route.url ? 'secondary' : 'ghost'}
                        className={cn(
                          'font-semibold text-md ring-0',
                          pathName === route.url
                            ? 'text-white'
                            : 'text-black dark:text-gray-50 hover:text-white'
                        )}
                      >
                        {route.name}
                      </Button>
                    </Link>
                  ))}
                </div>

                <Link href='https://github.com/benlhachemi/modifio.git'>
                  <Button
                    variant='default'
                    className='rounded-full w-fit bg-sky-600 gap-2 items-center flex hover:bg-sky-600/70'
                    size='lg'
                  >
                    <span>Github Repo</span>
                    <span className='text-xl'>
                      <BsGithub />
                    </span>
                  </Button>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
