'use client';
import Image from 'next/image';
import Link from 'next/link';
import 'firebaseConfig';
import Cookies from 'js-cookie';
import { NavUserMobile, NavMonitorMobile, NavAdminMobile, NavAdminDesktop, NavMonitorDesktop, NavUserDesktop } from 'containers/Navigation';
import { usePathname, useRouter } from 'next/navigation';
// import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from 'hooks/useAuth';
import { useState, useContext } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Bars3Icon, InformationCircleIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

// images
import logo from '@logos/primary-logo.png';
const profile = 'https://picsum.photos/200/300';

const Menu = () => {
  const pathname = usePathname();
  const route = useRouter();
  const { userData, setUserData } = useContext(AuthContext);

  const logOut = () => {
    Cookies.remove('signIn');
    setUserData('Without user');
    route.push('/');
  };

  // Menu for admin
  if (pathname.startsWith('/admin')) {
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
              <h2>{userData.username}</h2>
              <p className="font-light">{userData.rol}</p>
            </div>
          </div>
        </div>

        <NavAdminDesktop pathname={pathname} />

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="h-6 w-6" />
            <p>Inbox</p>
          </div>

          <button onClick={() => logOut()} className="w-2/3 hover:bg-primary-y transition flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full">
            Cerrar sesi&oacute;n
            <ArrowRightOnRectangleIcon className="w-8 h-8" />
          </button>
        </div>
      </aside>
    );
  }
  // Menu for monitor
  else if (pathname.startsWith('/monitor')) {
    return (
      <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 2xl:w-1/5">
        <div className="flex flex-col items-center">
          <Link href={'/monitor'}>
            <Image src={logo} width={100} height={100} alt="logo" />
          </Link>

          <div className="flex my-10 gap-6 items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image src={profile} width={100} height={100} alt="profile image" />
            </div>
            <div>
              <h2>{userData.username}</h2>
              <p className="font-light">{userData.rol}</p>
            </div>
          </div>
        </div>

        <NavMonitorDesktop pathname={pathname} />

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="h-6 w-6" />
            <p>Inbox</p>
          </div>

          <button onClick={() => logOut()} className="w-full xl:w-2/3 hover:bg-primary-y transition flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full">
            Cerrar sesi&oacute;n
            <ArrowRightOnRectangleIcon className="w-8 h-8" />
          </button>
        </div>
      </aside>
    );
  }
  // Menu for user
  else {
    return (
      <aside className="hidden lg:flex flex-col items-center justify-around p-4 h-screen w-3/12 2xl:w-1/5">
        <div className="flex flex-col items-center">
          <Link href={'/user'}>
            <Image src={logo} width={100} height={100} alt="logo" />
          </Link>

          <div className="flex my-10 gap-6 items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image src={profile} width={100} height={100} alt="profile image" />
            </div>
            <div>
              <h2>{userData.username}</h2>
              <p className="font-light">{userData.rol}</p>
            </div>
          </div>
        </div>

        <NavUserDesktop pathname={pathname} />

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="h-6 w-6" />
            <p>Inbox</p>
          </div>

          <button onClick={() => logOut()} className="w-2/3 hover:bg-primary-y transition flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full">
            Cerrar sesi&oacute;n
            <ArrowRightOnRectangleIcon className="w-8 h-8" />
          </button>
        </div>
      </aside>
    );
  }
};

const NavMobiile = () => {
  const pathname = usePathname();
  const [click, setClick] = useState(false);
  const route = useRouter();
  let slide = null;
  const { userData, setUserData } = useContext(AuthContext);

  const handleClick = () => {
    setClick(!click);
  };

  // const auth = getAuth();
  const logOut = () => {
    // signOut(auth)
    //   .then(() => {
    //     console.log('log out');
    //     Cookies.remove('signIn');
    //     route.push('/');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    Cookies.remove('signIn');
    setUserData('Without user');
    route.push('/');
  };

  // Mobile menu for admin
  const slideAdmin = (
    <aside className="fixed flex justify-end backdrop-brightness-50 top-0 right-0 z-10 h-screen w-full">
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
                <h2>{userData.username}</h2>
                <p className="font-light">{userData.rol}</p>
              </div>
            </div>
          </div>

          <NavAdminMobile pathname={pathname} handleClick={() => handleClick()} />

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="h-6 w-6" />
              <p>Inbox</p>
            </div>

            <button
              onClick={() => logOut()}
              className="w-11/12 sm:w-2/3 bg-dark transition hover:opacity-80 font-bold text-white flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full"
            >
              Cerrar sesi&oacute;n
              <ArrowRightOnRectangleIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Slide>
    </aside>
  );
  // Mobile menu for monitor
  const slideMonitor = (
    <aside className="fixed flex justify-end backdrop-brightness-50 top-0 right-0 z-10 h-screen w-full">
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
                <h2>{userData.username}</h2>
                <p className="font-light">{userData.rol}</p>
              </div>
            </div>
          </div>

          <NavMonitorMobile pathname={pathname} handleClick={() => handleClick()} />

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="h-6 w-6" />
              <p>Inbox</p>
            </div>

            <button
              onClick={() => logOut()}
              className="w-2/3 bg-dark transition hover:opacity-80 font-bold text-white flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full"
            >
              Cerrar sesi&oacute;n
              <ArrowRightOnRectangleIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Slide>
    </aside>
  );
  // MObile menu for user
  const slideUser = (
    <aside className="fixed flex justify-end backdrop-brightness-50 top-0 right-0 z-10 h-screen w-full">
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
                <h2>{userData.username}</h2>
                <p className="font-light">{userData.rol}</p>
              </div>
            </div>
          </div>

          <NavUserMobile pathname={pathname} handleClick={() => handleClick()} />

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="h-6 w-6" />
              <p>Inbox</p>
            </div>

            <button
              className="w-2/3 bg-dark transition hover:opacity-80 font-bold text-white flex justify-center items-center gap-2 border-2 border-black py-2 px-4 my-4 rounded-full"
              onClick={() => logOut()}
            >
              Cerrar sesi&oacute;n
              <ArrowRightOnRectangleIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Slide>
    </aside>
  );

  // Ckech te path to select a menu
  if (pathname.startsWith('/admin')) {
    slide = slideAdmin;
  } else if (pathname.startsWith('/monitor')) {
    slide = slideMonitor;
  } else {
    slide = slideUser;
  }

  return (
    <header className="h-1/6 flex lg:hidden justify-between items-center p-8">
      <div>
        <Link href={`/${userData.rol}`}>
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
