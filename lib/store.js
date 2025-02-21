import { create } from "zustand";

const useStore = create((set) => ({
  // ✅ Renters State
  renters: [],
  setRenters: (renters) => set({ renters }),
  addRenter: (renter) => set((state) => ({ renters: [renter, ...state.renters] })),
  updateRenter: (updatedRenter) =>
    set((state) => ({
      renters: state.renters.map((renter) =>
        renter._id === updatedRenter._id ? updatedRenter : renter
      ),
    })),
  deleteRenter: (renterId) =>
    set((state) => ({
      renters: state.renters.filter((renter) => renter._id !== renterId),
    })),

  // ✅ Dialog States
  showAddRenter: false,
  setShowAddRenter: (status) => set({ showAddRenter: status }),

  showEditRenter: false,
  setShowEditRenter: (status) => set({ showEditRenter: status }),

  showDeleteDialog: false,
  setShowDeleteDialog: (status) => set({ showDeleteDialog: status }),

  // ✅ Selected Renter for Editing or Deleting
  selectedRenter: null,
  setSelectedRenter: (renter) => set({ selectedRenter: renter }),

  // ✅ Authentication State
  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}));

export default useStore;























