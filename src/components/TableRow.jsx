import { handleGetAllData } from 'api/endpoints/useGetData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const SimpleRow = ({ data }) => {
  return (
    <tr className="bg-gray-300">
      <td className="px-10 py-5 text-center">
        <div className="flex items-center justify-start gap-4">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <p>{data.fullname || 'Carlos'}</p>
        </div>
      </td>
      <td className="px-10 py-5 text-center">{data?.situation}</td>
      <td className="px-10 py-5 text-center">{data?.date}</td>
      <td className="px-10 py-5 text-center">{data?.time}</td>
    </tr>
  );
};

const AdvanceRow = ({ data }) => {
  return (
    <tr>
      <td className="px-10 py-5 text-center">
        <div className="flex items-center justify-start gap-4">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <p>{data.fullname || 'Carlos'}</p>
        </div>
      </td>
      <td className="px-10 py-5 text-center">{data?.situation}</td>
      <td className="px-10 py-5 text-center">{data?.date}</td>
      <td className="px-10 py-5 flex gap-2 items-center justify-center">
        <button className="px-5 py-2 bg-gray-700 rounded-full text-white flex gap-2 items-center font-bold">
          <span>
            <PencilIcon className="w-4 h-4" />
          </span>
          Edit
        </button>
        <button className="px-5 py-3 bg-red-600 rounded-full text-white flex gap-2 items-center font-bold">
          <span>
            <TrashIcon className="w-5 h-5" />
          </span>
        </button>
      </td>
    </tr>
  );
};

const AdminRow = async () => {
  const userArray = await handleGetAllData();
  console.log(userArray);

  // const userList = userArray.map((user) => <AdvanceRow data={user} key={user.id} />);
  // return userList;
};

const TableRow = async () => {
  const userArray = await handleGetAllData();

  const userList = userArray.map((user) => <SimpleRow data={user} key={user.id} />);
  return userList;
};

export { TableRow, AdminRow };
