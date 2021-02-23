import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    CameraImage: 0,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.CameraImage = action.payload;
    },
    resetCameraImage:(state)=>{
      state.CameraImage = null;
    }
  },
});

export const {  setCameraImage,resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = state => state.camera.CameraImage;

export default cameraSlice.reducer;
