import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalProps: Record<string, any> | null;
}

interface ModalPayload {
  modalType: string;
  modalProps?: Record<string, any>;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps ?? null;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = null;
    },

    updateModalProps: (state, action: PayloadAction<Record<string, any>>) => {
      state.modalProps = { ...(state.modalProps ?? {}), ...action.payload };
    },
  },
});

export const { openModal, closeModal, updateModalProps } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
