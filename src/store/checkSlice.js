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
      console.log("Добавляем чек:", action.payload);
      state.checks.push(action.payload);

      try {
        localStorage.setItem("checks", JSON.stringify(state.checks));
      } catch (e) {
        console.error("Ошибка сохранения данных", e);
      }
    },
    removeCheck: (state, action) => {
      state.checks = state.checks.filter(check => check.id !== action.payload);
      localStorage.setItem("checks", JSON.stringify(state.checks));
    },
    updateCheck: (state, action) => {
      const index = state.checks.findIndex(check => check.id === action.payload.id);
      if (index !== -1) {
        state.checks[index] = action.payload;
        localStorage.setItem("checks", JSON.stringify(state.checks));
      }
    },
  }
});

export const { addCheck, removeCheck, updateCheck } = dataSlice.actions;
export default dataSlice.reducer;
