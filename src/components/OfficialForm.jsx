import React, { useRef, useEffect } from "react";
import { useStore } from "../stores/store";

export default function OfficialForm() {
  const { updateOfficialFlag, official } = useStore();
  const badgeRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");

  useEffect(() => {
    if (official) {
      badgeRef.current.value = official.Badge;
      firstNameRef.current.value = official.FirstName;
      lastNameRef.current.value = official.LastName;
    }
  }, [official]);

  async function handleSubmit(e) {
    e.preventDefault();

    const values = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Badge: badgeRef.current.value,
    };
    values.FullName = `${values.FirstName} ${values.LastName}`;

    if (official) {
      values.id = official.id;
      try {
        await fetch(
          "https://astro-api-demo-git-main-nelsonx73.vercel.app/api/officials",
          {
            method: "PUT",
            "Content-Type": "appication/json",
            body: JSON.stringify(values),
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch(
          "https://astro-api-demo-git-main-nelsonx73.vercel.app/api/officials",
          {
            method: "POST",
            "Content-Type": "appication/json",
            body: JSON.stringify(values),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    badgeRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";

    updateOfficialFlag();
  }

  function handleCancel() {
    badgeRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";

    updateOfficialFlag();
  }

  return (
    <form onSubmit={handleSubmit} autocomplete="off">
      <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-2  text-[#333]">
        <div>
          <label className="text-sm block font-medium ">Badge #</label>
          <input
            type="text"
            placeholder="Badge number"
            required
            name="Badge"
            ref={badgeRef}
            className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
        </div>
        <div>
          <label className="text-sm block font-medium ">First name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            name="FirstName"
            ref={firstNameRef}
            className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
        </div>
        <div>
          <label className="text-sm block font-medium ">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            name="LastName"
            ref={lastNameRef}
            className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
          >
            {official ? "Update" : "Insert"}
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
