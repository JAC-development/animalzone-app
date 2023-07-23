import { UserIcon, ClockIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export const NavAdminDesktop = ({ pathname }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'/admin/users'}>
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
      <Link href={'/admin'}>
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
      <Link href={'/admin'}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/admin/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <Cog6ToothIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Configuraci&oacute;n</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const NavMonitorDesktop = ({ pathname }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'monitor/history'}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/monitor/history' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Historial</p>
            <p className="font-light">1 Capturado</p>
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
      <Link href={'/monitor/settings'}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/monitor/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <Cog6ToothIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Configuraci&oacute;n</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const NavUserDesktop = ({ pathname }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'/user/profile'}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/user/profile' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Perfil</p>
          </div>
        </div>
      </Link>
      <Link href={'/user/history'}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/user/history' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Mi historial</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const NavAdminMobile = ({ pathname, handleClick }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'admin/users'} onClick={() => handleClick()}>
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
      <Link href={'/'} onClick={() => handleClick()}>
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
      <Link href={'/'} onClick={() => handleClick()}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/admin/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <Cog6ToothIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Configuraci&oacute;n</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const NavMonitorMobile = ({ pathname, handleClick }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'monitor/history'} onClick={() => handleClick()}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/monitor/history' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Historial</p>
            <p className="font-light">1 Capturado</p>
          </div>
        </div>
      </Link>
      <Link href={'/monitor'} onClick={() => handleClick()}>
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
        <div className="flex gap-4 items-center">
          <div className={pathname === '/monitor/settings' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <Cog6ToothIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Configuraci&oacute;</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const NavUserMobile = ({ pathname, handleClick }) => {
  return (
    <div className="flex flex-col gap-8">
      <Link href={'/user/profile'} onClick={() => handleClick()}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/user/profile' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Perfil</p>
          </div>
        </div>
      </Link>
      <Link href={'/user/history'} onClick={() => handleClick()}>
        <div className="flex gap-4 items-center">
          <div className={pathname === '/user/history' ? 'w-12 h-12 bg-primary-y grid place-items-center rounded-lg' : 'w-12 h-12 grid place-items-center rounded-lg'}>
            <ClockIcon className="w-8 h-8" />
          </div>
          <div>
            <p>Mi historial</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
