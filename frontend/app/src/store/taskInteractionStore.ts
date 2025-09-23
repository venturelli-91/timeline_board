import { create } from "zustand";
import { TaskInteractionStore } from "../types/stores/taskInteraction";

export const useTaskInteractionStore = create<TaskInteractionStore>((set) => ({
	selectedTaskId: null,
	setSelectedTask: (id) => set({ selectedTaskId: id }),
}));
