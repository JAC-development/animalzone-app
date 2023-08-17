'use client';
import React from 'react';
import { useState } from 'react';
import { PlusIcon, FunnelIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { AdminRow } from '@components/TableRow';
import { handleAddData } from 'api/endpoints/useGetData';
import bcrypt from 'bcryptjs';

export default async function AdminUsers() {
  const [show, setShow] = useState(true);
  const [showUsers] = useState(true);
  const [userRole, setUserRole] = useState('user');
  const [addName, setAddName] = useState('');
  const [addSurname, setAddSurname] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const pass = await bcrypt.hash('cisco', 10);
  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24 lg:pt-24 w-full">
      {/* Go back section on top */}
      <div className="flex gap-4">
        <div className="flex items-start">
          <button>
            <span>
              <ArrowLeftCircleIcon className="w-10 h-10" />
            </span>
          </button>
        </div>
        <div>
          <h1 className="text-3xl">Users</h1>
          <p className="text-gray-400">List of all registered users</p>
        </div>
      </div>

      {/* Menu section for filters and actions */}
      <div className="grid grid-cols-4 md:grid-cols-9 grid-rows-2 md:grid-rows-1 gap-4 mt-12 mb-4 md:mb-12">
        <input type="text" placeholder="Search" className="col-span-3 md:col-span-3 md:col-start-1 border-2 rounded-full border-black px-4 py-2" />
        <button className="col-span-1 md:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center">
          <PrinterIcon className="w-5 h-5 mx-auto" />
          {/* {currentWidth > 640 ? <span>Print</span> : <></>} */}
        </button>
        <button className="row-start-2 md:row-start-1 hover:bg-gray-300 py-2 px-5 rounded-full col-span-2 md:col-span-2 md:col-start-4 mr-auto flex gap-2 items-center font-bold">
          <span>
            <FunnelIcon className="w-5 h-5" />
          </span>
          Sort by
        </button>
        <button className="row-start-2 hover:bg-gray-300 py-2 px-5 rounded-full md:row-start-1 col-span-2 md:col-span-2 md:col-start-7 ml-auto flex gap-2 items-center font-bold">
          <span>
            <PlusIcon className="w-5 h-5" />
          </span>
          New user
        </button>
      </div>

      {/* New user modal */}
      <div className={`fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40 ${show ? 'block' : 'hidden'}`}></div>
      <div className={`fixed z-20 left-0 right-0 top-0 bottom-0 m-auto w-[90%] h-[65%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white py-6 px-8 sm:px-16 xl:px-18 ${show ? 'block' : 'hidden'}`}>
        <div className="h-full flex flex-col justify-between py-6">
          <div>
            <p className="text-center font-bold mb-4">Agregar usuario</p>
            <p className="text-center text-gray-700">Introduce los datos del nuevo usuario para el registro.</p>
          </div>
          <div className="flex gap-4 flex-col py-6">
            <input onChange={(e) => setAddName(e.target.value)} className="outline-none border-2 border-gray-400 rounded-full px-4 py-2" type="text" placeholder="Nombre" />
            <input onChange={(e) => setAddSurname(e.target.value)} className="outline-none border-2 border-gray-400 rounded-full px-4 py-2" type="text" placeholder="Apellido" />
            <input onChange={(e) => setAddEmail(e.target.value)} className="outline-none border-2 border-gray-400 rounded-full px-4 py-2" type="text" placeholder="Correo electronico" />
            <div className="flex justify-around">
              <div className="flex gap-2">
                <input type="radio" name="userRole" value={'user'} checked={userRole === 'user'} id="userRole" onChange={(e) => setUserRole(e.target.value)} />
                <label htmlFor="userRole">Empleado</label>
                <input type="radio" name="userRole" value={'admin'} checked={userRole === 'admin'} id="adminRole" onChange={(e) => setUserRole(e.target.value)} />
                <label htmlFor="adminRole">Admin</label>
                <input type="radio" name="userRole" value={'monitor'} checked={userRole === 'monitor'} id="monitorRole" onChange={(e) => setUserRole(e.target.value)} />
                <label htmlFor="monitorRole">Monitor</label>
              </div>
            </div>
          </div>
          <div>
            <button
              disabled={userRole === undefined}
              onClick={() => handleAddData({ name: addName, surname: addSurname, email: addEmail, rol: userRole, password: pass })}
              className="bg-yellow-500 disabled:opacity-40 text-black font-semibold py-2 px-5 rounded-full w-full mb-3"
            >
              Registrar
            </button>
            <button onClick={() => setShow(!show)} className="border-gray-500 border-2 text-gray-600 py-2 px-5 rounded-full w-full">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {showUsers ? (
        /* Table for users data */
        <div id="history-table" className="w-full">
          <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="px-10 py-5 sticky top-0">Full Name</th>
                <th className="px-10 py-5 sticky top-0">Record</th>
                <th className="px-10 py-5 sticky top-0">Role</th>
                <th className="px-10 py-5 sticky top-0">Actions</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              <AdminRow />
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty data holder */
        <div className="w-full">
          <p className="text-center py-12 text-gray-400">No recent activity</p>
        </div>
      )}
    </div>
  );
}
