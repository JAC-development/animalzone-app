'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

// Images
import logo from '@logos/primary-logo.png';

export default function Home() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const form = useRef(null);
  // Get inputs data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    console.log(data);
  };

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="w-10/12 max-w-md text-center">
        <div className="flex justify-center">
          <Image src={logo} width={100} height={100} alt="logo" />
        </div>
        <div className="my-10">
          <p className="font-light">ANIMAL ZONE</p>
          <p className="text-3xl md:text-5xl">Wellcome back!</p>
        </div>
        <form className="flex flex-col my-4 text-start gap-2" ref={form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input className="rounded-full border-2 border-black px-4 py-2 outline-none mb-6" name="username" onChange={(e) => setUser(e.target.value)} type="text" placeholder="Enter your username" />
          <label htmlFor="password">Password</label>
          <input className="rounded-full border-2 border-black px-4 py-2 outline-none mb-6" name="password" onChange={(e) => setPass(e.target.value)} type="text" placeholder="Enter your password" />

          <div className="w-full flex justify-center my-4">
            <button
              disabled={!user || !pass}
              className="w-3/5 flex disabled:bg-slate-300 justify-center items-center gap-4 bg-primary-y rounded-full px-4 py-2 font-bold hover:opacity-75 transition"
              type="submit"
            >
              Login <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
        <div className="my-4">
          <Link className="font-bold text-slate-500" href="#">
            Forgot your password?
          </Link>
        </div>
        <div className="w-full sm:w-4/5 font-light text-slate-600 mt-6 mx-auto">
          <p>All data is saved on the cloud, if you have any problem with the sign in please contact support.</p>
        </div>
      </div>
    </main>
  );
}
