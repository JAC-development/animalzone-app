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
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'modified') {
        const name = await handleIdToName(change.doc.id);
        console.log(change.doc.data().status);
        if (change.doc.data().status === 'entrada') {
          notifyIn(`${name} ha llegado`);
        } else {
          notifyOut(`${name} ha salido`);
        }
      }
    });
  });

  const fetchData = async () => {
    const res = await handleGetAllData();
    return res;
  };

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
      <ToastContainer limit={1} />
    </main>
  );
}
