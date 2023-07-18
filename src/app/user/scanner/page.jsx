'use client';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function Scanner() {
  return (
    <div className="pt-20 w-full text-center">
      <h2 className="my-4">Escanea el codigo de asistencia</h2>
      <div className="w-1/2 mx-auto">
        <QrScanner onDecode={(result) => console.log(result)} onError={(error) => console.log(error?.message)} />
      </div>
    </div>
  );
}
