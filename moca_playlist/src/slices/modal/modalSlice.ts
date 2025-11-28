import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  modalType: string | null;  
  modalProps: any | null;  
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
    // 모달 열기 + 데이터 전달
    openModal: (
      state,
      action: PayloadAction<{ modalType: string; modalProps?: any }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps ?? null;
    },

    // 모달 닫기
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = null;
    },

    // 모달 Props 업데이트
    updateModalProps: (state, action: PayloadAction<any>) => {
      state.modalProps = { ...state.modalProps, ...action.payload };
    },
  },
});

export const { openModal, closeModal, updateModalProps } = modalSlice.actions;

const modalReduser = modalSlice.reducer

export default modalReduser;
