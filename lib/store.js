import { create } from "zustand";

const useStore = create((set) => ({
  // ✅ Renters State
  renters: [],
  setRenters: (renters) => set({ renters }),

  // === Show form DIALOG State === 
  showForm: false,
  setShowForm: (status) => set({ showForm: status }),

  // === Edit RENTER DETAILS DIALOG State === 
  showEditRenter: false,
  setShowEditRenter: (status) => set({ showEditRenter: status }),

  // === Delete RENTER DIALOG State ===
  showDeleteRenterDialog: false,
  setShowDeleteRenterDialog: (status) => set({ showDeleteRenterDialog: status }),

  // === Delete PAYMENT DIALOG State ===
  showDeletePaymentDialog: false,
  setShowDeletePaymentDialog: (status) => set({ showDeletePaymentDialog: status }),

  // === Edit PAYMENT of a RENTER DIALOG State === 
  showEditPaymentDialog: false,
  setShowEditPaymentDialog: (status) => set({ showEditPaymentDialog: status }),

  // === edit (active/inactive) DIALOG State ===
  showStatusChangeDialog: false,
  setShowStatusChangeDialog: (status) => set({ showStatusChangeDialog: status }),




  // === Authentication State ===
  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),

  // === Btn Submiting State ===
  isSubmitting: false,
  setIsSubmitting: (status) => set({ isSubmitting: status }),


  




  // showDeleteDialog: false,
  // setShowDeleteDialog: (status) => set({ showDeleteDialog: status }),

  // === Selected Renter for Editing or Deleting ===
  selectedRenter: null,
  setSelectedRenter: (renter) => set({ selectedRenter: renter }),

}));

export default useStore;























