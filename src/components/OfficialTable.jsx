import React, { useState, useEffect } from "react";
import { useStore } from "../stores/store";
import { getOfficials } from "../services/officialServices";

export default function OfficialTable() {
  const [data, setData] = useState([]);
  const { officialFlag, updateOfficial } = useStore();

  useEffect(() => {
    async function getData() {
      const rows = await getOfficials();
      if (rows) setData(rows);
    }

    getData();
  }, [officialFlag]);

  function handleEdit(item) {
    updateOfficial(item);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            {/* <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Full Name
                        </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Badge #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="text-xs font-medium text-gray-500">
                No record found!
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-[#333]">
                  {item.FirstName}
                </td>
                <td className="px-6 py-4 text-sm text-[#333]">
                  {item.LastName}
                </td>
                {/* <td className="px-6 py-4 text-sm text-[#333]">
                                    {item.FullName}
                                </td> */}
                <td className="px-6 py-4 text-sm text-[#333]">{item.Badge}</td>
                <td className="px-6 py-4 text-sm text-[#333]">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    data-drawer-target="drawer-contact"
                    data-drawer-show="drawer-contact"
                    aria-controls="drawer-contact"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
