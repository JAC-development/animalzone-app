/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useRef, useEffect } from 'react';
import { PlusIcon, FunnelIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { AdvanceMonitorRow } from '@components/TableRow';
import { handleGetAllData } from 'api/endpoints/useGetData';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { DocTemplateUsers } from '@components/DocTemplate';
import { stylesUsers } from 'assets/PDF/pdfstyles';
import { generate } from 'generate-password';
import emailjs from '@emailjs/browser';

export default function MonitorUsers() {
  const [show, setShow] = useState(false);
  const [showUsers] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userSurname, setUserSurname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [docData, setDocData] = useState([]);
  const [search, setSearch] = useState('');
  const [isClient, setIsClient] = useState(false);
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

  const fetchData = async () => {
    const userArray = await handleGetAllData();
    console.log(userArray);
    const userList = userArray.map((user) => <AdvanceMonitorRow data={user} key={user.id} />);
    setDocData(DocTemplateUsers(userArray));
    setTableData(userList);
  };

  // Render the users list
  useEffect(() => {
    fetchData();
    setIsClient(true);
  }, []);

  // Render the users list
  // useEffect(async () => {
  //   const userArray = await handleGetAllData();
  //   console.log(userArray);
  //   const userList = userArray.map((user) => <AdvanceRow data={user} del={handleDeleteUser} key={user.id} />);
  //   setTableData(userList);
  // }, [search]);

  // Function to generate PDF
  const generatePDF = () => (
    <Document>
      <Page size="A4" style={stylesUsers.body}>
        <View style={stylesUsers.table}>
          <View style={stylesUsers.tableRow}>
            <View style={stylesUsers.tableCol}>
              <Text style={stylesUsers.tableCell}>Nombre</Text>
            </View>
            <View style={stylesUsers.tableCol}>
              <Text style={stylesUsers.tableCell}>Apellido</Text>
            </View>
            <View style={stylesUsers.tableCol}>
              <Text style={stylesUsers.tableCell}>Correo</Text>
            </View>
            <View style={stylesUsers.tableCol}>
              <Text style={stylesUsers.tableCell}>Función</Text>
            </View>
          </View>
        </View>
        <View>{docData}</View>
      </Page>
    </Document>
  );

  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24 lg:pt-24 w-full max-h-screen overflow-y-scroll">
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
        {isClient && (
          <PDFDownloadLink
            document={generatePDF()}
            fileName="usuarios.pdf"
            className="col-span-1 md:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
          >
            <PrinterIcon className="w-5 h-5 mx-auto" />
          </PDFDownloadLink>
        )}
      </div>

      {showUsers ? (
        /* Table for users data */
        <div id="history-table" className="w-full">
          <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="px-10 py-5 top-0">Nombre Completo</th>
                <th className="px-10 py-5 top-0">Record</th>
                <th className="px-10 py-5 top-0">Correo</th>
                <th className="px-10 py-5 top-0">Rol</th>
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
