import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalPayload<T = any> {
  modalType: string;
  modalProps?: T;
}

interface ModalState<T = any> {
  isOpen: boolean;
  modalType: string | null;
  modalProps: T | null;

  openModal: (payload: ModalPayload<T>) => void;
  closeModal: () => void;
  updateModalProps: (props: Partial<T>) => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    modalType: null,
    modalProps: null,

    openModal: ({ modalType, modalProps = null }) =>
      set((state) => {
        state.isOpen = true;
        state.modalType = modalType;
        state.modalProps = modalProps;
      }),

    closeModal: () =>
      set((state) => {
        state.isOpen = false;
        state.modalType = null;
        state.modalProps = null;
      }),

    updateModalProps: (props) =>
      set((state) => {
        if (state.modalProps) {
          state.modalProps = { ...state.modalProps, ...props };
        } else {
          state.modalProps = { ...props } as any;
        }
      }),
  }))
);
