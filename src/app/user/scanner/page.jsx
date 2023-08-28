'use client';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { handleAddAttendance } from 'api/endpoints/useGetData';
import { AuthContext } from 'hooks/useAuth';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Scanner() {
  const [coord, setCoord] = useState('');
  const [show, setShow] = useState(true);
  const { userData } = useContext(AuthContext);
  const [scanned, setScanned] = useState('Cargando...');

  const notify = (text) =>
    toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const notifyError = (text) =>
    toast.error(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const registerAttendance = (text) => {
    try {
      handleAddAttendance({
        uid: userData.id,
        user: userData.name,
        inPlace: text,
        date: new Date(),
      });
      notify('Asistencia registrada');
      setScanned('Asistencia registrada');
    } catch (error) {
      notifyError(error?.message);
    }
  };

  const getLocation = () => {
    function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    function getRange(userLat, userLon) {
      const lat2 = 31.6107277; //31.61051615873971
      const lon2 = -106.4297168; //-106.42972201841312
      const maxRange = 0.07;
      const earthKm = 6371; // Radio de la Tierra en kilómetros

      const dLat = toRadians(lat2 - userLat);
      const dLon = toRadians(lon2 - userLon);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(userLat)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distancia = earthKm * c;

      if (distancia <= maxRange) {
        registerAttendance('es igual');
        return 'es igual';
      } else {
        notifyError('No estas en el rango');
        setShow(true);
        return 'No es igual';
      }
    }

    const showPosition = (position) => {
      const res = getRange(position.coords.latitude, position.coords.longitude);
      const data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        range: res,
        uid: userData.id,
      };
      setCoord(data);
    };

    navigator.geolocation.getCurrentPosition(showPosition);
    return coord;
  };

  const handleGetLocation = (res) => {
    setShow(false);
    res === 'animalzone' ? getLocation() : notifyError('Codigo QR invalido');
  };

  return (
    <div className="pt-2 sm:pt-20 w-full text-center">
      <h2 className="my-4">Escanea el codigo de asistencia</h2>
      <div className="w-full sm:w-3/4 md:w-1/2 mx-auto">
        {show ? <QrScanner onDecode={(res) => handleGetLocation(res)} onError={(error) => console.log(error?.message)} /> : <h1 className="my-20">{scanned}</h1>}
      </div>
      <ToastContainer />
    </div>
  );
}
