'use client';
import Image from 'next/image';
import QR from '@logos/QR.png';

export default function QRCode() {
  return (
    <div className="pt-2 md:pt-40 w-full text-center">
      <h2 className="my-4 font-bold">Codigo de asistencia</h2>
      <p>Escanear este codigo para la asistencia.</p>
      <div className="w-full flex justify-center">
        <Image src={QR} className="w-[250px] h-[250px]" />
      </div>
      <p></p>
      <p className="opacity-50">En caso de requerir cambiarlo, por favor contacte al soporte tecnico.</p>
    </div>
  );
}
