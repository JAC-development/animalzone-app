'use client';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from 'firebaseConfig';
import { ChevronRightIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import { useState, useContext } from 'react';
import { AuthContext } from 'hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleIdToName } from 'api/endpoints/useGetData';

// get the firestore
const firestore = getFirestore(app);

export default function Admin() {
  const show = true;
  const [openTab, setOpenTab] = useState('viewUsers');
  const { userData } = useContext(AuthContext);
  const id = 'animalzone';

  const notifyIn = (text) => {
    toast.success(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      toastId: id,
      icon: false,
      progress: undefined,
      theme: 'colored',
    });
    toast.clearWaitingQueue();
  };
  const notifyOut = (text) => {
    toast.error(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      toastId: id,
      icon: false,
      progress: undefined,
      theme: 'colored',
    });
    toast.clearWaitingQueue();
  };
  const q = query(collection(firestore, 'attendance'));
  // onSnapshot(q, (snapshot) => {
  //   snapshot.docChanges().forEach(async (change) => {
  //     if (change.type === 'modified') {
  //       const name = await handleIdToName(change.doc.id);
  //       console.log(change.doc.data().status);
  //       if (change.doc.data().status === 'entrada') {
  //         notifyIn(`${name} ha llegado`);
  //       } else {
  //         notifyOut(`${name} ha salido`);
  //       }
  //     }
  //   });
  // });
  return (
    <div className="px-8 pb-16 pt-24 lg:px-14 xl:px-24 flex flex-col justify-between">
      {/* Main section */}
      <div>
        {/* Welcome message */}
        <div>
          <p className="text-gray-400">ANIMAL ZONE</p>
          <p className="text-5xl py-2">Hola, {userData.name}!</p>
          <p className="text-gray-400">Administrador</p>
        </div>

        {/* Report quick action block */}
        <div className="py-8">
          <button className="col-span-1 md:col-start-8 bg-yellow-400 hover:opacity-80 transition py-3 px-8 rounded-full flex items-center justify-center font-semibold">
            Generar reporte
            <span className="pl-2">
              <ChevronRightIcon className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Quick view on list (Users and Organization details) */}
      <div>
        <div className="flex flex-col justify-between">
          <ul className="flex items-center gap-3 justify-start">
            <li>
              <button
                onClick={() => setOpenTab('viewUsers')}
                className={`inline-block p-2 text-gray-600 text-xl ${openTab === 'viewUsers' ? 'font-bold border-b-2 border-black' : 'font-regular text-gray-400'}`}
              >
                Empleados
              </button>
            </li>
            <li>
              <button
                onClick={() => setOpenTab('viewOrganization')}
                className={`inline-block p-2 text-gray-600 text-xl ${openTab === 'viewOrganization' ? 'font-bold border-b-2 border-black' : 'font-regular text-gray-400'}`}
              >
                Mi Organizacion
              </button>
            </li>
          </ul>
          <div className="mt-4">
            <div className={openTab === 'viewUsers' ? 'block' : 'hidden'}>
              {show ? (
                /* Table for list of users */
                <div id="employees-table" className="w-full">
                  <table className="block sm:table py-4 mx-auto w-full max-w-full overflow-x-auto">
                    <tbody className="whitespace-nowrap">
                      <tr className="bg-gray-200">
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Miriam Rodriguez</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">43 Asistencias</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Victor Carrillo</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">22 Asistencias</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <td className="px-10 py-5 text-center">
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <p>Jonathan Ocampo</p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-center">13 Asistencias</td>
                        <td className="px-10 py-5 text-center">
                          <button>
                            <span>
                              <EllipsisHorizontalCircleIcon className="w-10 h-10" />
                            </span>
                          </button>
                        </td>
                      </tr>
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
            <div className={openTab === 'viewOrganization' ? 'block' : 'hidden'}>
              {!show ? (
                /* Organization info */
                <div id="employees-table" className="w-full">
                  <h1>Animal Zone</h1>
                </div>
              ) : (
                /* Empty data holder */
                <div className="w-full">
                  <p className="text-center py-12 text-gray-400">No info to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
