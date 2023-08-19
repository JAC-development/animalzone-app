import { useEffect, useState } from 'react';

const useGetLocation = () => {
  const [coord, setCoord] = useState('');

  useEffect(() => {
    const showPosition = (position) => {
      const data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCoord(data);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return;
    }
  }, []);
  return coord;
};

export default useGetLocation;
