'use client';
import Link from 'next/link';
import { CameraIcon } from '@heroicons/react/24/outline';
import { handleGetUserDates } from 'api/endpoints/useGetData';
import { UserRow } from '@components/TableRow';
import { AuthContext } from 'hooks/useAuth';
import { useEffect, useContext, useState } from 'react';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { DocTemplateUserHistory } from '@components/DocTemplate';
import { stylesUserHistory } from 'assets/PDF/pdfstyles';

export default function Home() {
  const { userData } = useContext(AuthContext);
  const [tableData, setTableData] = useState(null);
  const [docData, setDocData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const fetchData = async () => {
    const userArray = await handleGetUserDates(userData.id);
    const userList = userArray.map((ref) => <UserRow data={ref} key={ref.id} />);
    setDocData(DocTemplateUserHistory(userArray));
    // console.log(userArray);
    setTableData(userList);
  };

  // Function to generate PDF
  const generatePDF = () => (
    <Document>
      <Page size="A4" style={stylesUserHistory.body}>
        <View style={stylesUserHistory.table}>
          <View style={stylesUserHistory.tableRow}>
            <View style={stylesUserHistory.tableCol}>
              <Text style={stylesUserHistory.tableCell}>Nombre Completo</Text>
            </View>
            <View style={stylesUserHistory.tableCol}>
              <Text style={stylesUserHistory.tableCell}>Registro</Text>
            </View>
            <View style={stylesUserHistory.tableCol}>
              <Text style={stylesUserHistory.tableCell}>Tipo</Text>
            </View>
            <View style={stylesUserHistory.tableCol}>
              <Text style={stylesUserHistory.tableCell}>Fecha</Text>
            </View>
            <View style={stylesUserHistory.tableCol}>
              <Text style={stylesUserHistory.tableCell}>Hora</Text>
            </View>
          </View>
        </View>
        <View>{docData}</View>
      </Page>
    </Document>
  );

  // Render the users list
  useEffect(() => {
    fetchData();
    setIsClient(true);
  }, []);

  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24 lg:pt-24 w-full">
      {/* Go back section on top */}
      <div className="flex gap-4 lg:mb-16">
        <div>
          <h1 className="text-3xl">Historial</h1>
          <p className="text-gray-400">Ultimas asistencias y fechas.</p>
          {isClient && (
            <PDFDownloadLink
              document={generatePDF()}
              fileName="Historial de asistencias.pdf"
              className="col-span-1 md:col-start-9 bg-yellow-400 hover:bg-yellow-600 p-3 rounded-full font-bold flex items-center justify-center"
            >
              <PrinterIcon className="w-5 h-5 mx-auto" />
            </PDFDownloadLink>
          )}
        </div>
      </div>
      <div id="history-table" className="w-full">
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
      </div>
      <Link className="fixed md:w-[50%] lg:hidden w-[70%] mx-auto bottom-10 p-2 right-0 left-0 bg-primary-y grid place-items-center rounded-full" href={'/user/scanner'}>
        <div className="flex gap-2 items-center">
          <div className="w-12 h-12 grid place-items-center">
            <CameraIcon className="w-8 h-8 font-bold" />
          </div>
          <div>
            <p className="font-bold">Escanear QR</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
