'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import { UserIcon, Bars3Icon, DocumentTextIcon, Cog6ToothIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

// images
import logo from '@logos/primary-logo.png';
import { useState } from 'react';
import { Slide } from 'react-awesome-reveal';
const profile = 'https://picsum.photos/200/300';

const Menu = () => {
  const pathname = usePathname();
  const user = {
    name: 'Cesar',
    rol: 'Admin',
  };
  return (
    <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 2xl:w-1/5">
      <div className="flex flex-col items-center">
        <Link href={'/admin'}>
          <Image src={logo} width={100} height={100} alt="logo" />
        </Link>

        <div className="flex my-10 gap-6 items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image src={profile} width={100} height={100} alt="profile image" />
          </div>
          <div>
            <h2>{user.name}</h2>
            <p className="font-light">{user.rol}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Link href={'admin/users'}>
          <div className="flex gap-4 items-center">
            <div className={pathname === '/admin/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <p>Users</p>
              <p className="font-light">8 registered</p>
            </div>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex gap-4 items-center">
            <div className={pathname === '/admin/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
              <DocumentTextIcon className="w-8 h-8" />
            </div>
            <div>
              <p>Attendance</p>
              <p className="font-light">1 Captured today</p>
            </div>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex gap-4 items-center">
            <div className={pathname === '/admin/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
              <Cog6ToothIcon className="w-8 h-8" />
            </div>
            <div>
              <p>Settings</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="h-6 w-6" />
          <p>Inbox</p>
        </div>

        <button className="w-2/3 hover:bg-primary-y transition flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full">
          Sign out
          <ArrowRightOnRectangleIcon className="w-8 h-8" />
        </button>
      </div>
    </aside>
  );
};

const NavMobiile = () => {
  const pathname = usePathname();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const user = {
    name: 'Cesar',
    rol: 'Admin',
  };

  const slide = (
    <aside className="absolute flex justify-end backdrop-brightness-50 top-0 right-0 z-10 h-screen w-full">
      <Slide direction="right" className="w-10/12">
        <div className=" flex flex-col items-center justify-around h-screen bg-white">
          <button className="absolute top-10 left-10" onClick={() => handleClick()}>
            <XMarkIcon className="w-10 h-10" />
          </button>
          <div className="flex justify-center">
            <div className="flex my-10 gap-6 items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image src={profile} width={100} height={100} alt="profile image" />
              </div>
              <div>
                <h2>{user.name}</h2>
                <p className="font-light">{user.rol}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Link href={'admin/users'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Users</p>
                  <p className="font-light">8 registered</p>
                </div>
              </div>
            </Link>
            <Link href={'/'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <DocumentTextIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Attendance</p>
                  <p className="font-light">1 Captured today</p>
                </div>
              </div>
            </Link>
            <Link href={'/'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <Cog6ToothIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Settings</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="h-6 w-6" />
              <p>Inbox</p>
            </div>

            <button className="w-2/3 bg-dark transition hover:opacity-80 font-bold text-white flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full">
              Sign out
              <ArrowRightOnRectangleIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Slide>
    </aside>
  );
  return (
    <header className="h-1/6 flex lg:hidden justify-between items-center p-8">
      <div>
        <Link href={'/admin'}>
          <Image src={logo} width={100} height={100} alt="logo" />
        </Link>
      </div>
      <button onClick={() => handleClick()}>
        <Bars3Icon className="h-10 w-10" />
      </button>
      {click ? slide : null}
    </header>
  );
};

export { Menu, NavMobiile };
