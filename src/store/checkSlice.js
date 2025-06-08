import { createSlice } from "@reduxjs/toolkit";

const loadLocalStorage = () => {
  try {
    const checks = localStorage.getItem("checks");
    console.log('данные отправлены');
    return checks ? JSON.parse(checks) : [];
  } catch (e) {
    console.warn("Ошибка загрузки локальных данных", e);
    return [];
  }
};

const initialState = {
  checks: loadLocalStorage(),
};

export const dataSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    addCheck: (state, action) => {
      state.checks.push({
        ...action.payload,
        id: Date.now(),
      });

      try {
        localStorage.setItem("checks", JSON.stringify(state.checks));
      } catch (e) {
        console.error("Ошибка сохранения данных", e);
      }
    },
  },
});

export const { addCheck } = dataSlice.actions;
export default dataSlice.reducer;
