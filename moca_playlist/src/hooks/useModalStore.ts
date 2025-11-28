import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalProps: any | null;

  openModal: (payload: { modalType: string; modalProps?: any }) => void;
  closeModal: () => void;
  updateModalProps: (props: any) => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    modalType: null,
    modalProps: null,

    openModal: ({ modalType, modalProps }) =>
      set((state) => {
        state.isOpen = true;
        state.modalType = modalType;
        state.modalProps = modalProps ?? null;
      }),

    closeModal: () =>
      set((state) => {
        state.isOpen = false;
        state.modalType = null;
        state.modalProps = null;
      }),

    updateModalProps: (props: any) =>
      set((state) => {
        state.modalProps = { ...state.modalProps, ...props };
      }),
  }))
);