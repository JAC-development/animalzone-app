"use client";
import Image from "next/image";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [value] = useState(new Date());

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1>AnimalZone app</h1>
      <div className="w-1/2 flex justify-center">
        <Calendar value={value} />
      </div>
    </main>
  );
}
