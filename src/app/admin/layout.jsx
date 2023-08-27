/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useState, useEffect } from 'react';
import { Menu, NavMobiile } from '@components/Menu';
import { handleGetAllData } from 'api/endpoints/useGetData';

export default function adminLayout({ children }) {
  const [userArray, setUserArray] = useState();
  const [amountUsers, setAmountUsers] = useState();

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
    </main>
  );
}
