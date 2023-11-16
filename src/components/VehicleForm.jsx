import React, { useRef, useEffect } from "react";
import { useStore } from "../stores/store";
import { postVehicles, putVehicles } from "../services/vehicleServices";

export default function VehicleForm() {
  const { updateVehicleFlag, vehicle } = useStore();
  const unitRef = useRef("");
  const nameRef = useRef("");

  useEffect(() => {
    if (vehicle) {
      unitRef.current.value = vehicle.Unit;
      nameRef.current.value = vehicle.Name;
    }
  }, [vehicle]);

  async function handleSubmit(e) {
    e.preventDefault();

    const values = {
      Unit: unitRef.current.value,
      Name: nameRef.current.value,
    };

    if (vehicle) {
      values.id = vehicle.id;
      await putVehicles(values);
    } else {
      await postVehicles(values);
    }

    unitRef.current.value = "";
    nameRef.current.value = "";

    updateVehicleFlag();
  }

  function handleCancel() {
    unitRef.current.value = "";
    nameRef.current.value = "";

    updateVehicleFlag();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6  text-[#333]">
        <div className="relative">
          <input
            ref={unitRef}
            name="Unit"
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Unit #
          </label>
        </div>

        <div className="relative">
          <input
            ref={nameRef}
            name="Name"
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Vehicle Name
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            {vehicle ? "Update" : "Insert"}
          </button>

          <button
            type="button"
            className="px-6 py-2 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-[#333] hover:bg-[#222] active:bg-[#333]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
