/* eslint-disable no-unused-vars */
'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { DocTemplateAttendance } from '@components/DocTemplate';
import { stylesAttendance } from 'assets/PDF/pdfstyles';
import { AttendanceRow } from '@components/TableRow';
import { DocTemplateUsers } from '@components/DocTemplate';
import { handleGetUserDates, handleGetAllData, handleGetUserDatesListPM, handleIdToName } from 'api/endpoints/useGetData';
// Function to generate PDF
const generatePDF = () => (
  <Document>
    <Page size="A4" style={stylesAttendance.body}>
      <View style={stylesAttendance.table}>
        <View style={stylesAttendance.tableRow}>
          <View style={stylesAttendance.tableCol}>
            <Text style={stylesAttendance.tableCell}>Nombre</Text>
          </View>
          <View style={stylesAttendance.tableCol}>
            <Text style={stylesAttendance.tableCell}>Apellido</Text>
          </View>
          <View style={stylesAttendance.tableCol}>
            <Text style={stylesAttendance.tableCell}>Registro</Text>
          </View>
          <View style={stylesAttendance.tableCol}>
            <Text style={stylesAttendance.tableCell}>Horas adicionales</Text>
          </View>
          <View style={stylesAttendance.tableCol}>
            <Text style={stylesAttendance.tableCell}>Tiempo</Text>
          </View>
        </View>
      </View>
      <View>
        <DocTemplateAttendance />
      </View>
    </Page>
  </Document>
);

export default function AttendanceViewAdmin() {
  const [tableData, setTableData] = useState(null);
  const [userArray, setUserArray] = useState([]);
  const [userFiltered, setUserFiltered] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [docData, setDocData] = useState([]);
  const form = useRef(null);

  const fetchData = async () => {
    const ft = await handleGetAllData();
    setUserArray(ft);
    const userAttendanceArray = await handleGetUserDates('jlBZj5VWM95cvgIlZzvs');
    const userList = userAttendanceArray.map((ref) => <AttendanceRow data={ref} id={'jlBZj5VWM95cvgIlZzvs'} key={ref.id} />);
    setDocData(DocTemplateUsers(userAttendanceArray));
    setTableData(userList);
  };

  // Render the users list
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeUser = (user) => {
    setUserSelected('jlBZj5VWM95cvgIlZzvs');
  };

  // New filter
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      month: formData.get('month'),
    };
    if (userSelected != '' || data.month != '') {
      const newList = await handleGetUserDatesListPM({ id: 'jlBZj5VWM95cvgIlZzvs', month: data.month });
      setUserFiltered(newList);
      console.log(newList);
    }
    fetchData();
  };

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
          <h1 className="text-3xl">Asistencia</h1>
          <p className="text-gray-400">Un resumen clasificado y revisado.</p>
        </div>
      </div>
      {/* Menu section for filters and actions */}
      <div className="grid grid-cols-4 md:grid-cols-9 grid-rows-3 md:grid-rows-1 gap-4 mt-12 mb-4 md:mb-12">
        {/* <input type="text" placeholder="Search" className="col-span-3 md:col-span-3 md:col-start-1 border-2 rounded-full border-black px-4 py-2" /> */}
        <select name="uss" defaultValue={'user'} className="row-start-2 md:row-start-1 col-span-4 md:col-span-3 md:col-start-1 outline-none border-2 border-gray-400 rounded-full py-3 px-6">
          {userArray.map((user) => (
            <option className="capitalize" value={`${user.name} ${user.surname}`} key={user._id}>
              {user.name} {user.surname} ({user.email})
            </option>
          ))}
          ;
        </select>
        <select name="uss" defaultValue={'1'} className="row-start-1 md:row-start-1 col-span-2 md:col-span-2 md:col-start-4 outline-none border-2 border-gray-400 rounded-full py-3 px-6">
          <option className="capitalize" value="1">
            Enero
          </option>
        </select>
        <button className="row-start-3 md:row-start-1 col-span-2 2xl:col-span-1 md:col-start-6 text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-full font-bold flex items-center justify-center">
          Buscar
        </button>
        <PDFDownloadLink
          document={generatePDF()}
          fileName="usuarios.pdf"
          className="col-span-2 row-start-3 md:row-start-1 md:col-start-8 2xl:col-span-1 2xl:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
        >
          <PrinterIcon className="w-5 h-5 mx-auto" />
        </PDFDownloadLink>
      </div>
      {/* Table for users data */}
      <div id="history-table" className="w-full">
        {userSelected !== '' ? (
          <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="px-10 py-5 sticky top-0">Nombre Completo</th>
                <th className="px-10 py-5 sticky top-0">Registro</th>
                <th className="px-10 py-5 sticky top-0">Tipo</th>
                <th className="px-10 py-5 sticky top-0">Fecha</th>
                <th className="px-10 py-5 sticky top-0">Hora</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">{tableData}</tbody>
          </table>
        ) : (
          <div className="flex justify-center">
            <p className="text-gray-500">No hay filtros por aplicar</p>
          </div>
        )}
      </div>
    </div>
  );
}
