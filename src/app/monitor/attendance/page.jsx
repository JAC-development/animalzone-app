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
import { handleGetUserDates, handleGetAllData, handleGetUserDatesPM, handleGetUserDatesListPM, handleNameToId } from 'api/endpoints/useGetData';

export default function AttendanceViewMonitor() {
  const [tableData, setTableData] = useState(null);
  const [userArray, setUserArray] = useState([]);
  const [userSelected, setUserSelected] = useState('empty');
  const [currentYear, setCurrentYear] = useState('');
  const [iseClient, setIsClient] = useState(false);
  const [docData, setDocData] = useState([]);
  const form = useRef(null);

  const fetchData = async () => {
    setUserArray(await handleGetAllData());
    if (userSelected) {
      const userAttendanceArray = await handleGetUserDates(userSelected);
      const userList = userAttendanceArray.map((ref) => <AttendanceRow data={ref} id={userSelected} key={ref.id} />);
      setDocData(DocTemplateAttendance(userAttendanceArray));
      setTableData(userList);
    }
  };

  // Render the users list
  useEffect(() => {
    fetchData();
    setIsClient(true);
    var dt = new Date();
    setCurrentYear(dt.getFullYear());
  }, []);

  // New filter
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      month: formData.get('month'),
      email: formData.get('uss'),
      year: formData.get('year'),
    };

    if (data.month === 'All') {
      fetchData();
    } else {
      const newList = await handleGetUserDatesListPM(userSelected, `${data.month} ${data.year}`);

      const userList = newList.map((ref) => <AttendanceRow data={ref} id={userSelected} key={ref.id} />);
      setDocData(DocTemplateUsers(newList));
      setTableData(userList);
    }
  };

  // Function to generate PDF
  const generatePDF = () => (
    <Document>
      <Page size="A4" style={stylesAttendance.body}>
        <View style={stylesAttendance.table}>
          <View style={stylesAttendance.tableRow}>
            <View style={stylesAttendance.tableCol}>
              <Text style={stylesAttendance.tableCell}>Nombre completo</Text>
            </View>
            <View style={stylesAttendance.tableCol}>
              <Text style={stylesAttendance.tableCell}>Registro</Text>
            </View>
            <View style={stylesAttendance.tableCol}>
              <Text style={stylesAttendance.tableCell}>Tipo</Text>
            </View>
            <View style={stylesAttendance.tableCol}>
              <Text style={stylesAttendance.tableCell}>Fecha</Text>
            </View>
            <View style={stylesAttendance.tableCol}>
              <Text style={stylesAttendance.tableCell}>Hora</Text>
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
          <h1 className="text-3xl">Asistencia</h1>
          <p className="text-gray-400">Un resumen clasificado y revisado.</p>
        </div>
      </div>
      {/* Menu section for filters and actions */}
      <div>
        <form id="new-form" className="grid grid-cols-4 md:grid-cols-9 grid-rows-3 md:grid-rows-1 gap-4 mt-12 mb-4 md:mb-12" ref={form} onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="Search" className="col-span-3 md:col-span-3 md:col-start-1 border-2 rounded-full border-black px-4 py-2" /> */}
          <select
            name="uss"
            onChange={(e) => setUserSelected(e.target.value)}
            defaultValue={'hola'}
            className="row-start-2 md:row-start-1 col-span-4 md:col-span-3 md:col-start-1 outline-none border-2 border-gray-400 rounded-full py-3 px-6"
          >
            <option value="empty">Usuario</option>
            {iseClient &&
              userArray.map((user) => (
                <option className="capitalize" value={user?.id} key={user.id}>
                  {user.name} {user.surname} <strong>({user.email})</strong>
                </option>
              ))}
            ;
          </select>
          <select name="month" defaultValue={'All'} className="row-start-1 md:row-start-1 col-span-2 md:col-span-2 md:col-start-4 outline-none border-2 border-gray-400 rounded-full py-3 px-6">
            <option className="capitalize" value="All">
              Toda asistencia
            </option>
            <option className="capitalize" value="January">
              Enero
            </option>
            <option className="capitalize" value="February">
              Febrero
            </option>
            <option className="capitalize" value="March">
              Marzo
            </option>
            <option className="capitalize" value="April">
              Abril
            </option>
            <option className="capitalize" value="May">
              Mayo
            </option>
            <option className="capitalize" value="June">
              Junio
            </option>
            <option className="capitalize" value="July">
              Julio
            </option>
            <option className="capitalize" value="August">
              Agosto
            </option>
            <option className="capitalize" value="September">
              Septiembre
            </option>
            <option className="capitalize" value="Octuber">
              Octubre
            </option>
            <option className="capitalize" value="November">
              Noviembre
            </option>
            <option className="capitalize" value="December">
              Dicembre
            </option>
          </select>
          <select name="year" defaultValue={currentYear} className="row-start-1 md:row-start-1 col-span-2 md:col-span-1 md:col-start-6 outline-none border-2 border-gray-400 rounded-full py-3 px-6">
            <option className="capitalize" value={currentYear - 1}>
              {currentYear - 1}
            </option>
            <option className="capitalize" value={currentYear}>
              {currentYear}
            </option>
            <option className="capitalize" value={currentYear + 1}>
              {currentYear + 1}
            </option>
          </select>
          {userSelected === 'empty' ? (
            <button
              disabled
              type="submit"
              className="row-start-3 md:row-start-1 col-span-2 2xl:col-span-1 md:col-start-7 disabled:bg-slate-300 text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-full font-bold flex items-center justify-center"
            >
              Buscar
            </button>
          ) : (
            <button
              type="submit"
              className="row-start-3 md:row-start-1 col-span-2 2xl:col-span-1 md:col-start-7 disabled:bg-slate-300 text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-full font-bold flex items-center justify-center"
            >
              Buscar
            </button>
          )}
          {iseClient && (
            <PDFDownloadLink
              document={generatePDF()}
              fileName="Asistencia.pdf"
              className="col-span-2 row-start-3 md:row-start-1 md:col-start-9 2xl:col-span-1 2xl:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
            >
              <PrinterIcon className="w-5 h-5 mx-auto" />
            </PDFDownloadLink>
          )}
        </form>
      </div>
      {/* Table for users data */}
      <div id="history-table" className="w-full">
        {userSelected !== '' ? (
          <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
            <thead>
              <tr>
                <th className="px-10 py-5 top-0">Nombre Completo</th>
                <th className="px-10 py-5 top-0">Registro</th>
                <th className="px-10 py-5 top-0">Tipo</th>
                <th className="px-10 py-5 top-0">Fecha</th>
                <th className="px-10 py-5 top-0">Hora</th>
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
