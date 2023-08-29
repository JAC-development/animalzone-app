'use client';
import { handleGetAllData, handleIdToName } from 'api/endpoints/useGetData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { AuthContext } from 'hooks/useAuth';
import { useContext, useState, useRef, useEffect } from 'react';

const SimpleRow = ({ data }) => {
  const { userData } = useContext(AuthContext);
  return (
    <tr className="bg-gray-300">
      <td className="px-10 py-5 text-center">
        <div className="flex items-center justify-start gap-4">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <p>{userData.name + userData.surname}</p>
        </div>
      </td>
      <td className="px-10 py-5 text-center">{data?.situation}</td>
      <td className="px-10 py-5 text-center">{data?.date}</td>
      <td className="px-10 py-5 text-center">{data?.time}</td>
    </tr>
  );
};

const AttendanceRow = ({ data, id }) => {
  const [refFullName, setRefFullName] = useState();
  const [refDay, setRefDay] = useState();
  const [refMonth, setRefMonth] = useState();
  const [refYear, setRefYear] = useState();
  const [refFullHour, setRefFullHour] = useState();
  const [refTime, setRefTime] = useState();

  useEffect(() => {
    const date = new Date(data.date.seconds * 1000);
    setRefFullName(handleIdToName(id));
    setRefDay(date.getDate());
    setRefMonth(date.getMonth() + 1);
    setRefYear(date.getFullYear());
    const hours = date.getHours();
    const hours12 = hours % 12 || 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    setRefFullHour(`${hours12}:${formattedMinutes}`);
    if (hours > 12) {
      setRefTime(1);
    } else {
      setRefTime(0);
    }
  }, []);

  return (
    <tr className="text-gray-600">
      <td className="px-10 py-5 text-center">
        <div className="flex items-center justify-center gap-4">
          <p className="capitalize text-center">{refFullName}</p>
        </div>
      </td>
      <td className="px-10 py-5 text-center">Asistencia</td>
      <td className="px-10 py-5 text-center capitalize">{data.status}</td>
      <td className="px-10 py-5 text-center">
        {refDay}/{refMonth}/{refYear}
      </td>
      <td className="px-10 py-5 text-center font-bold">
        {refFullHour} {refTime == 1 ? 'PM' : 'AM'}
      </td>
    </tr>
  );
};

const SimpleAttendace = async () => {
  const userArray = await handleGetAllData();
  const userList = userArray.map((user) => <AttendanceRow data={user} key={user.id} />);
  return userList;
};

const UserRow = ({ data }) => {
  const { userData } = useContext(AuthContext);
  const [refDay, setRefDay] = useState();
  const [refMonth, setRefMonth] = useState();
  const [refYear, setRefYear] = useState();
  const [refFullHour, setRefFullHour] = useState();
  const [refTime, setRefTime] = useState();
  useEffect(() => {
    const date = new Date(data.date.seconds * 1000);
    setRefDay(date.getDate());
    setRefMonth(date.getMonth() + 1);
    setRefYear(date.getFullYear());
    const hours = date.getHours();
    const hours12 = hours % 12 || 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    setRefFullHour(`${hours12}:${formattedMinutes}`);
    if (hours > 12) {
      setRefTime(1);
    } else {
      setRefTime(0);
    }
  }, []);
  return (
    <tr className="text-gray-600">
      <td className="px-10 py-5 text-center">
        <div className="flex items-center justify-center gap-4">
          <p className="capitalize text-center">
            {userData.name} {userData.surname}
          </p>
        </div>
      </td>
      <td className="px-10 py-5 text-center">Asistencia</td>
      <td className="px-10 py-5 text-center capitalize">{data.status}</td>
      <td className="px-10 py-5 text-center">
        {refDay}/{refMonth}/{refYear}
      </td>
      <td className="px-10 py-5 text-center font-bold">
        {refFullHour} {refTime == 1 ? 'PM' : 'AM'}
      </td>
    </tr>
  );
};

const AdvanceRow = ({ data, del, edit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userSurname, setUserSurname] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const formEdit = useRef(null);

  const showEditModal = async ({ name, surname, email, rol }) => {
    setShowEdit(!showEdit);
    setUserName(name);
    setUserSurname(surname);
    setUserEmail(email);
    setUserRol(rol);
  };

  // Edit user function
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formEdit.current);
    const dataEdit = {
      name: formData.get('new-name'),
      surname: formData.get('new-surname'),
      email: formData.get('new-email'),
      rol: formData.get('new-role'),
    };
    if (dataEdit.name != '' || dataEdit.email != '') {
      if (await edit({ _id: data.id, name: dataEdit.name, surname: dataEdit.surname, email: dataEdit.email, rol: dataEdit.rol })) {
        setShowEdit(false);
      } else {
        setShowEdit(false);
        document.getElementById('edit-form').reset();
      }
    }
  };

  return (
    <>
      {/* Edit user modal */}
      <div className={`fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40 ${showEdit ? 'block' : 'hidden'}`}></div>
      <div
        className={`fixed z-20 left-0 right-0 top-0 bottom-0 m-auto w-[90%] h-[65%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white py-6 px-8 sm:px-16 xl:px-18 ${showEdit ? 'block' : 'hidden'}`}
      >
        <form id="edit-form" className="h-[85%] flex flex-col justify-around" ref={formEdit} onSubmit={handleSubmitEdit}>
          <div>
            <p className="text-center font-bold mb-4">Editar usuario</p>
            <p className="text-center text-gray-700">Introduce los nuevos datos del usuario.</p>
          </div>
          <div className="flex gap-2 flex-col">
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              autoComplete="given-name"
              id="new-name"
              name="new-name"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Nombre"
            />
            <input
              onChange={(e) => setUserSurname(e.target.value)}
              value={userSurname}
              autoComplete="family-name"
              id="new-surname"
              name="new-surname"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Apellido"
            />
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              autoComplete="email"
              id="new-email"
              name="new-email"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Correo electronico"
            />
            <select name="new-role" value={userRol} className="outline-none border-2 mt-4 border-gray-400 rounded-full px-4 py-2">
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="monitor">Monitor</option>
            </select>
          </div>
          <div>
            <button disabled={!userName || !userSurname || !userEmail} className="bg-yellow-500 disabled:opacity-40 text-black font-semibold py-2 px-5 rounded-full w-full" type="submit">
              Registrar
            </button>
          </div>
        </form>
        <button onClick={() => setShowEdit(!showEdit)} className="border-gray-500 border-2 text-gray-600 py-2 px-5 rounded-full w-full">
          Cancelar
        </button>
      </div>
      <tr>
        <td className="px-10 py-5 text-center">
          <div className="flex items-center justify-center gap-4">
            {/* <div className="w-8 h-8 bg-black rounded-full"></div> */}
            <p className="capitalize">{`${data.name} ${data.surname}` || 'Carlos'}</p>
          </div>
        </td>
        <td className="px-10 py-5 text-center">{data?.record || '---'}</td>
        <td className="px-10 py-5 text-center">{data?.email || '---'}</td>
        <td className="px-10 py-5 text-center capitalize">{data?.rol}</td>
        <td className="px-10 py-5 flex gap-2 items-center justify-center">
          <button
            onClick={() => showEditModal({ name: data.name, surname: data.surname, email: data.email, rol: data.rol })}
            className="px-5 py-2 bg-gray-700 rounded-full text-white flex gap-2 items-center font-bold"
          >
            <span>
              <PencilIcon className="w-4 h-4" />
            </span>
            Edit
          </button>
          <button onClick={() => del(data.id)} className="px-5 py-3 bg-red-600 rounded-full text-white flex gap-2 items-center font-bold">
            <span>
              <TrashIcon className="w-5 h-5" />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};

const AdvanceMonitorRow = ({ data }) => {
  return (
    <>
      <tr>
        <td className="px-10 py-5 text-center">
          <div className="flex items-center justify-center gap-4">
            {/* <div className="w-8 h-8 bg-black rounded-full"></div> */}
            <p className="capitalize">
              {data.name} {data.surname}
            </p>
          </div>
        </td>
        <td className="px-10 py-5 text-center">{data?.record || '---'}</td>
        <td className="px-10 py-5 text-center">{data?.email || '---'}</td>
        <td className="px-10 py-5 text-center capitalize">{data?.rol}</td>
      </tr>
    </>
  );
};

const TableRow = async () => {
  const userArray = await handleGetAllData();

  const userList = userArray.map((user) => <SimpleRow data={user} key={user.id} />);
  return userList;
};

export { TableRow, AdvanceRow, UserRow, SimpleAttendace, AttendanceRow, AdvanceMonitorRow };
