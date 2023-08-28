'use client';
import { ArrowLeftCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FunnelIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { DocTemplateAttendance } from '@components/DocTemplate';
import { stylesAttendance } from 'assets/PDF/pdfstyles';
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
  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24 w-full">
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
      <div className="grid grid-cols-4 md:grid-cols-8 grid-rows-2 md:grid-rows-1 gap-4 mt-12 mb-4 md:mb-12">
        <input type="text" placeholder="Search" className="col-span-3 md:col-span-3 md:col-start-1 border-2 rounded-full border-black px-4 py-2" />
        <PDFDownloadLink
          document={generatePDF()}
          fileName="asistencias.pdf"
          className="col-span-1 md:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
        >
          <PrinterIcon className="w-5 h-5 mx-auto" />
        </PDFDownloadLink>
        <button className="row-start-2 md:row-start-1 col-span-2 md:col-span-2 md:col-start-4 mr-auto flex gap-2 items-center font-bold">
          <span>
            <FunnelIcon className="w-5 h-5" />
          </span>
          Filtrar por
        </button>
        <button className="row-start-2 md:row-start-1 col-span-2 md:col-span-2 md:col-start-6 ml-auto flex gap-2 items-center font-bold">
          <span>
            <PlusIcon className="w-5 h-5" />
          </span>
          Añadir horas
        </button>
      </div>
      <div id="history-table" className="w-full">
        <table className="block md:table py-8 mx-auto w-full max-w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="px-10 py-5 sticky top-0">Nombre Completo</th>
              <th className="px-10 py-5 sticky top-0">Registro</th>
              <th className="px-10 py-5 sticky top-0">Horas adicionales</th>
              <th className="px-10 py-5 sticky top-0">Time</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            <tr className="bg-gray-300">
              <td className="px-10 py-5 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <p>Miriam Rodriguez</p>
                </div>
              </td>
              <td className="px-10 py-5 text-center">14 asistecias</td>
              <td className="px-10 py-5 text-center">+5 horas</td>
              <td className="px-10 py-5 text-center">09:04 AM</td>
            </tr>
            <tr>
              <td className="px-10 py-5 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <p>Victor Carrillo</p>
                </div>
              </td>
              <td className="px-10 py-5 text-center">9 assistencias</td>
              <td className="px-10 py-5 text-center">+2 horas</td>
              <td className="px-10 py-5 text-center">09:04 AM</td>
            </tr>
            <tr className="bg-gray-300">
              <td className="px-10 py-5 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <p>Jonathan Ocampo</p>
                </div>
              </td>
              <td className="px-10 py-5 text-center">4 asistencias</td>
              <td className="px-10 py-5 text-center">n/a</td>
              <td className="px-10 py-5 text-center">09:04 AM</td>
            </tr>
            <tr>
              <td className="px-10 py-5 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <p>Carlos Sanchez</p>
                </div>
              </td>
              <td className="px-10 py-5 text-center">6 asistencias</td>
              <td className="px-10 py-5 text-center">+3 horas</td>
              <td className="px-10 py-5 text-center">09:04 AM</td>
            </tr>
            <tr className="bg-gray-300">
              <td className="px-10 py-5 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <p>David Aguirre</p>
                </div>
              </td>
              <td className="px-10 py-5 text-center">14 asistencias</td>
              <td className="px-10 py-5 text-center">+1 horas</td>
              <td className="px-10 py-5 text-center">09:04 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
