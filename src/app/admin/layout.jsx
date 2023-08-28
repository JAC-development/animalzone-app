/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useState, useEffect } from 'react';
import { Menu, NavMobiile } from '@components/Menu';
import { handleGetAllData } from 'api/endpoints/useGetData';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from 'firebaseConfig';
import { handleIdToName } from 'api/endpoints/useGetData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// get the firestore
const firestore = getFirestore(app);

export default function adminLayout({ children }) {
  const [userArray, setUserArray] = useState();
  const [amountUsers, setAmountUsers] = useState();
  const id = 'animalzone';

  const fetchData = async () => {
    const res = await handleGetAllData();
    return res;
  };

  const notify = (text) => {
    toast.warn(text, {
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
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'modified') {
        const name = await handleIdToName(change.doc.id);
        notify(`${change.doc.data().status} - ${name}`);
      }
    });
  });

  // Render the users list
  useEffect(() => {
    fetchData().then((res) => {
      setUserArray(res);
      setAmountUsers(res.length);
    });
  }, []);
  return (
    <main className="lg:flex">
      <Menu users={userArray} amount={amountUsers} />
      <NavMobiile />
      {children}
      <ToastContainer />
    </main>
  );
}
