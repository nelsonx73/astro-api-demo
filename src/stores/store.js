import { create } from "zustand";

export const useStore = create((set) => ({
  officialFlag: 0,
  official: null,
  updateOfficialFlag: () =>
    set((state) => ({ officialFlag: state.officialFlag + 1, official: null })),
  updateOfficial: (value) => set((state) => ({ official: value })),

  vehicleFlag: 0,
  vehicle: null,
  updateVehicleFlag: () =>
    set((state) => ({ vehicleFlag: state.vehicleFlag + 1, vehicle: null })),
  updateVehicle: (value) => set((state) => ({ vehicle: value })),
}));
