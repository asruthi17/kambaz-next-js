import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

const initialState = {
  modules: [] as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
      const newModule: Module = {
        _id: new Date().getTime().toString(),
        name: action.payload.name,
        course: action.payload.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload ? { ...module, editing: true } : module
      );
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;