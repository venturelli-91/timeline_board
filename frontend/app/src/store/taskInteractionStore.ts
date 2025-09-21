import { create } from "zustand";

interface TaskInteractionStore {
	selectedTaskId: number | null;
	setSelectedTask: (id: number | null) => void;
}

export const useTaskInteractionStore = create<TaskInteractionStore>((set) => ({
	selectedTaskId: null,
	setSelectedTask: (id) => set({ selectedTaskId: id }),
}));
