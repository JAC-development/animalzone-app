'use client';
import { QrScanner } from '@yudiel/react-qr-scanner';
import useGetLocation from 'hooks/useGetLocation';
import { useState } from 'react';

export default function Scanner() {
  const [location, setLocation] = useState('');
  const [qr, setQr] = useState('');
  const data = useGetLocation();
  const handleGetLocation = (res) => {
    setLocation(data);
    setQr(res);
  };
  return (
    <div className="pt-20 w-full text-center">
      <h2 className="my-4">Escanea el codigo de asistencia</h2>
      <div className="w-1/2 mx-auto">
        <QrScanner onDecode={(res) => handleGetLocation(res)} onError={(error) => console.log(error?.message)} />
      </div>
      <h2>{qr}</h2>
      <h2>lat: {location.lat}</h2>
      <h2>lon: {location.lng}</h2>
    </div>
  );
}
