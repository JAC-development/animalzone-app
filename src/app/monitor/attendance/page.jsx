import { ArrowLeftCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FunnelIcon, PrinterIcon } from '@heroicons/react/24/solid';

export default function AttendanceView() {
  return (
    <div className="px-8 py-12 lg:px-14 xl:px-24">
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
        <button className="col-span-1 md:col-start-8 bg-yellow-400 p-3 rounded-full font-bold flex items-center justify-center">
          <PrinterIcon className="w-5 h-5 mx-auto" />
          {/* {currentWidth > 640 ? <span>Print</span> : <></>} */}
        </button>
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
    </div>
  );
}
