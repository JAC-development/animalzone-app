'use client';
import 'firebaseConfig';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from 'hooks/useAuth';
import { useRouter } from 'next/navigation';
import handleGetData from 'api/endpoints/useGetData';
import { useLocalStorage } from 'hooks/useLocalStorage';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import login from '@auth/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Images
import logo from '@logos/primary-logo.png';

export default function Home() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useLocalStorage('userData', '');
  const form = useRef(null);
  const route = useRouter();
  const { setUserData } = useContext(AuthContext);

  const notify = (text) =>
    toast.error(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  // Get inputs data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get('username'),
      password: formData.get('password'),
    };

    handleGetData(data.email, data.password)
      .then((res) => {
        if (res) {
          const response = login(data.email, res.rol);
          setValue(res);
          setUserData(res);
          route.push(`/${response}`);
        } else {
          notify('Credenciales incorrectas');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="h-screen w-10/12 mx-auto sm:w-full flex items-center justify-center">
      <div className="w-auto max-w-md text-center">
        <div className="flex justify-center">
          <Image src={logo} width={'auto'} height={'auto'} alt="logo" />
        </div>
        <div className="my-10">
          <p className="font-light">ANIMAL ZONE</p>
          <p className="text-3xl md:text-5xl">Bienvenido!</p>
        </div>
        <form className="flex flex-col my-4 text-start gap-2" ref={form} onSubmit={handleSubmit}>
          <label htmlFor="username">Correo electronico</label>
          <input
            className="rounded-full border-2 border-black px-4 py-2 outline-none mb-6"
            id="username"
            name="username"
            autoComplete="email"
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="Introduce tu correo"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            className="rounded-full border-2 border-black px-4 py-2 outline-none mb-6"
            id="password"
            autoComplete="current-password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Introduce tu contraseña"
          />

          <div className="w-full flex justify-center my-4">
            <button
              disabled={!user || !pass}
              className="w-11/12 sm:w-3/5 flex disabled:bg-slate-300 justify-center items-center gap-4 bg-primary-y rounded-full px-4 py-2 font-bold hover:opacity-75 transition"
              type="submit"
            >
              Iniciar sesión <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
        <div className="my-4">
          <Link className="font-bold text-slate-500" href="#">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="w-full sm:w-4/5 font-light text-slate-600 mt-6 mx-auto">
          <p>Todos los datos se guardan en la nube, si tiene algún problema con el inicio de sesión, comuníquese con el soporte.</p>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
