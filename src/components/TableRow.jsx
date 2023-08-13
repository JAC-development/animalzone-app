import { handleGetAllData } from 'api/endpoints/useGetData';

const Template = ({ data }) => {
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

const TableRow = async () => {
  const userArray = await handleGetAllData();

  const userList = userArray.map((user) => <Template data={user} key={user.id} />);
  return userList;
};

export default TableRow;
