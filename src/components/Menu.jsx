/* eslint-disable no-dupe-else-if */
/* eslint-disable no-unused-vars */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import 'firebaseConfig';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { AuthContext } from 'hooks/useAuth';
import { useState, useContext, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Bars3Icon, UserIcon, ClockIcon, DocumentTextIcon, Cog6ToothIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, XMarkIcon, CameraIcon, QrCodeIcon } from '@heroicons/react/24/outline';

// images
import logo from '@logos/primary-logo.png';
const profile = 'https://i.natgeofe.com/n/8abd6735-0002-4ac9-8385-9d5749a23e37/veiled-chameleon_square.jpg';

const Menu = ({ users, amount }) => {
  const pathname = usePathname();
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useLocalStorage('userData', '');
  const route = useRouter();
  const { userData, setUserData } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const logOut = () => {
    Cookies.remove('signIn');
    setUserData('');
    setValue('');
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
              <img src={profile} className="w-[100px] h-[100px]" />
            </div>
            <div>
              {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
              <p className="font-light">Administrador</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Link href={'/admin/users'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/admin/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <UserIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Usuarios</p>
                <p className="font-light">{amount} registrados</p>
              </div>
            </div>
          </Link>
          <Link href={'/admin/attendance'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/admin/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <DocumentTextIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Asistencia</p>
              </div>
            </div>
          </Link>
          <Link href={'/admin/qr'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/admin/qr' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <QrCodeIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Codigo QR</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2 opacity-50">
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
          <Link href={'/monitor/attendance'}>
            <Image src={logo} width={100} height={100} alt="logo" />
          </Link>

          <div className="flex my-10 gap-6 items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={profile} className="w-[100px] h-[100px]" />
            </div>
            <div>
              {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
              <p className="font-light">Monitor</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Link href={'/monitor/users'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/monitor/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <ClockIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Usuarios</p>
              </div>
            </div>
          </Link>
          <Link href={'/monitor/attendance'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/monitor/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <DocumentTextIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Asistencia</p>
              </div>
            </div>
          </Link>
          <Link href={'/monitor'}>
            <div className="flex gap-4 items-center opacity-50">
              <div className={pathname === '/monitor/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <Cog6ToothIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Configuraci&oacute;n</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2 opacity-50">
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
              <img src={profile} className="w-[100px] h-[100px]" />
            </div>
            <div>
              {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
              <p className="font-light">Usuario</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center opacity-50">
            <div className={pathname === '/user/profile' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <p>Perfil</p>
            </div>
          </div>
          <Link href={'/user'}>
            <div className="flex gap-4 items-center">
              <div className={pathname === '/user' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                <ClockIcon className="w-8 h-8" />
              </div>
              <div>
                <p>Mi historial</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2 opacity-50">
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
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useLocalStorage('userData', '');
  const route = useRouter();
  let slide = null;
  const { userData, setUserData } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    setClick(!click);
  };

  const logOut = () => {
    Cookies.remove('signIn');
    setUserData('');
    setValue('');
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
                <img src={profile} className="w-[100px] h-[100px]" />
              </div>
              <div>
                {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
                <p className="font-light">Administrador</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Link href={'/admin/users'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Usuarios</p>
                  <p className="font-light">8 registrados</p>
                </div>
              </div>
            </Link>
            <Link href={'/admin/attendance'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <DocumentTextIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Asistencia</p>
                  <p className="font-light">1 Capturado</p>
                </div>
              </div>
            </Link>
            <Link href={'/admin/qr'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/admin/qr' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <QrCodeIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Codigo QR</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2 opacity-50">
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
                <img src={profile} className="w-[100px] h-[100px]" />
              </div>
              <div>
                {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
                <p className="font-light">Monitor</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Link href={'/monitor/users'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/monitor/users' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg p-4' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <ClockIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Usuarios</p>
                </div>
              </div>
            </Link>
            <Link href={'/monitor/attendance'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/monitor/attendance' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <DocumentTextIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Asistencia</p>
                </div>
              </div>
            </Link>
            <Link href={'/monitor'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center opacity-50">
                <div className={pathname === '/monitor/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <Cog6ToothIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Configuraci&oacute;</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2 opacity-50">
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
                <img src={profile} className="w-[100px] h-[100px]" />
              </div>
              <div>
                {isClient ? <h2 className="capitalize">{userData.name}</h2> : <h2>Usuario</h2>}
                <p className="font-light">Usuario</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Link href={'/user/profile'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center opacity-50">
                <div className={pathname === '/user/profile' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Perfil</p>
                </div>
              </div>
            </Link>
            <Link href={'/user'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/user' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <ClockIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Mi historial</p>
                </div>
              </div>
            </Link>
            <Link href={'/user/scanner'} onClick={() => handleClick()}>
              <div className="flex gap-4 items-center">
                <div className={pathname === '/user/scanner' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
                  <CameraIcon className="w-8 h-8" />
                </div>
                <div>
                  <p>Escanear QR</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2 opacity-50">
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
        {isClient ? (
          <Link href={`/${userData.rol}`}>
            <Image src={logo} width={100} height={100} alt="logo" />
          </Link>
        ) : (
          <Image src={logo} width={100} height={100} alt="logo" />
        )}
      </div>
      <button onClick={() => handleClick()}>
        <Bars3Icon className="h-10 w-10" />
      </button>
      {click ? slide : null}
    </header>
  );
};

export { Menu, NavMobiile };
