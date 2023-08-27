/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useRef, useEffect } from 'react';
import { PlusIcon, FunnelIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { AdvanceRow } from '@components/TableRow';
import { handleGetAllData, handleDeleteData, handleAddData, handleModifyData } from 'api/endpoints/useGetData';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink, Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { DocTemplateUsers } from '@components/DocTemplate';

// Document style for PDF
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 17,
  },
});

export default function AdminUsers() {
  const [show, setShow] = useState(false);
  const [showUsers] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userSurname, setUserSurname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [docData, setDocData] = useState([]);
  const [search, setSearch] = useState('');
  const form = useRef(null);

  const notifyError = (text) =>
    toast.error(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const notifySuccess = (text) =>
    toast.success(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const handleDeleteUser = async (id) => {
    handleDeleteData(id)
      .then(async () => {
        notifySuccess('Usuario eliminado correctamente');
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        notifyError('Algo salio mal.');
      });
  };

  const handleEditUser = async (id, name, surname, email, rol) => {
    handleModifyData(id, name, surname, email, rol)
      .then(async () => {
        notifySuccess('Usuario modificado correctamente');
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        notifyError('Algo salio mal.');
      });
  };

  const fetchData = async () => {
    const userArray = await handleGetAllData();
    console.log(userArray);
    const userList = userArray.map((user) => <AdvanceRow data={user} del={handleDeleteUser} edit={handleEditUser} key={user.id} />);
    setDocData(DocTemplateUsers(userArray));
    setTableData(userList);
  };

  // Render the users list
  useEffect(() => {
    fetchData();
  }, []);

  // Render the users list
  // useEffect(async () => {
  //   const userArray = await handleGetAllData();
  //   console.log(userArray);
  //   const userList = userArray.map((user) => <AdvanceRow data={user} del={handleDeleteUser} key={user.id} />);
  //   setTableData(userList);
  // }, [search]);

  // Add user function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const pass = await bcrypt.hash('cisco', 10);
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      rol: formData.get('role'),
      pass: pass,
    };
    if (data.name != '' || data.email != '') {
      if (await handleAddData({ name: data.name, surname: data.surname, email: data.email, rol: data.rol, password: data.pass })) {
        notifyError('Algo salio mal.');
        setShow(false);
      } else {
        notifySuccess('Usuario agregado correctamente');
        setShow(false);
        document.getElementById('new-form').reset();
        fetchData();
      }
    }
  };

  // Function to generate PDF
  const generatePDF = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Apellido</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Correo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Función</Text>
            </View>
          </View>
        </View>
        <View>{docData}</View>
      </Page>
    </Document>
  );

  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24 lg:pt-24 w-full">
      {/* Go back section on top */}
      <div className="flex gap-4">
        <div className="flex items-start">
          <button>
            <span>
              <ArrowLeftCircleIcon className="w-10 h-10" />
            </span>
          </button>
        </div>
        <div>
          <h1 className="text-3xl">Usuarios</h1>
          <p className="text-gray-400">Lista de todos los usuarios registrados.</p>
        </div>
      </div>

      {/* Menu section for filters and actions */}
      <div className="grid grid-cols-4 md:grid-cols-9 grid-rows-2 md:grid-rows-1 gap-4 mt-12 mb-4 md:mb-12">
        {/* <input type="text" placeholder="Search" className="col-span-3 md:col-span-3 md:col-start-1 border-2 rounded-full border-black px-4 py-2" /> */}
        <PDFDownloadLink
          document={generatePDF()}
          fileName="usuarios.pdf"
          className="col-span-1 md:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
        >
          <PrinterIcon className="w-5 h-5 mx-auto" />
        </PDFDownloadLink>
        {/* <button className="row-start-2 md:row-start-1 hover:bg-gray-300 py-2 px-5 rounded-full col-span-2 md:col-span-2 md:col-start-4 mr-auto flex gap-2 items-center font-bold">
          <span>
            <FunnelIcon className="w-5 h-5" />
          </span>
          Sort by
        </button> */}
        <button
          onClick={() => setShow(!show)}
          className="row-start-2 hover:bg-gray-300 py-2 px-5 rounded-full md:row-start-1 col-span-2 md:col-span-2 md:col-start-7 ml-auto flex gap-2 items-center font-bold"
        >
          <span>
            <PlusIcon className="w-5 h-5" />
          </span>
          Agregar usuario
        </button>
      </div>

      {/* New user modal */}
      <div className={`fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40 ${show ? 'block' : 'hidden'}`}></div>
      <div className={`fixed z-20 left-0 right-0 top-0 bottom-0 m-auto w-[90%] h-[65%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white py-6 px-8 sm:px-16 xl:px-18 ${show ? 'block' : 'hidden'}`}>
        <form id="new-form" className="h-[85%] flex flex-col justify-around" ref={form} onSubmit={handleSubmit}>
          <div>
            <p className="text-center font-bold mb-4">Agregar usuario</p>
            <p className="text-center text-gray-700">Introduce los datos del nuevo usuario para el registro.</p>
          </div>
          <div className="flex gap-2 flex-col">
            <input
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="given-name"
              id="name"
              name="name"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Nombre"
            />
            <input
              onChange={(e) => setUserSurname(e.target.value)}
              autoComplete="family-name"
              id="surname"
              name="surname"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Apellido"
            />
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              autoComplete="email"
              id="email"
              name="email"
              className="outline-none border-2 border-gray-400 rounded-full px-4 py-2"
              type="text"
              placeholder="Correo electronico"
            />
            <select name="role" defaultValue={'user'} className="outline-none border-2 mt-4 border-gray-400 rounded-full px-4 py-2">
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
        <button onClick={() => setShow(!show)} className="border-gray-500 border-2 text-gray-600 py-2 px-5 rounded-full w-full">
          Cancelar
        </button>
      </div>

      {showUsers ? (
        /* Table for users data */
        <div id="history-table" className="w-full">
          <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="px-10 py-5 sticky top-0">Nombre Completo</th>
                <th className="px-10 py-5 sticky top-0">Record</th>
                <th className="px-10 py-5 sticky top-0">Rol</th>
                <th className="px-10 py-5 sticky top-0">Acciones</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">{tableData}</tbody>
          </table>
        </div>
      ) : (
        /* Empty data holder */
        <div className="w-full">
          <p className="text-center py-12 text-gray-400">No recent activity</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
