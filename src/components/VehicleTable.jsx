import React, { useState, useEffect } from "react";
import { useStore } from "../stores/store";

import { getVehicles } from "../services/vehicleServices";

export default function VehicleTable() {
  const [data, setData] = useState([]);
  const { vehicleFlag, updateVehicle } = useStore();

  useEffect(() => {
    async function getData() {
      const rows = await getVehicles();
      if (rows) setData(rows);
    }

    getData();
  }, [vehicleFlag]);

  function handleEdit(item) {
    updateVehicle(item);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 font-[sans-serif]">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
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
                <td className="px-6 py-4 text-sm text-[#333]">{item.Unit}</td>
                <td className="px-6 py-4 text-sm text-[#333]">{item.Name}</td>
                <td className="px-6 py-4 text-sm text-[#333]">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="text-red-500 hover:text-red-700"
                    data-drawer-target="drawer-contact"
                    data-drawer-show="drawer-contact"
                    aria-controls="drawer-contact"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
