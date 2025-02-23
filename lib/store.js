import { create } from "zustand";

const useStore = create((set) => ({
  // ✅ Renters State
  renters: [],
  setRenters: (renters) => set({ renters }),

  // === Add renter Dialog State === 
  showAddRenter: false,
  setShowAddRenter: (status) => set({ showAddRenter: status }),

  // === Edit renter details Dialog State === 
  showEditRenter: false,
  setShowEditRenter: (status) => set({ showEditRenter: status }),

  // === delete Dialog State ===
  showDeleteRenterDialog: false,
  setShowDeleteRenterDialog: (status) => set({ showDeleteRenterDialog: status }),

  // === edit (active/inactive) Dialog State ===
  showStatusChangeDialog: false,
  setShowStatusChangeDialog: (status) => set({ showStatusChangeDialog: status }),




  // === Authentication State ===
  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),

  // === Btn Submiting State ===
  isSubmitting: false,
  setIsSubmitting: (status) => set({ isBtnLoading: status }),


  




  // showDeleteDialog: false,
  // setShowDeleteDialog: (status) => set({ showDeleteDialog: status }),

  // === Selected Renter for Editing or Deleting ===
  selectedRenter: null,
  setSelectedRenter: (renter) => set({ selectedRenter: renter }),

}));

export default useStore;























