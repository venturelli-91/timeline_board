import { create } from "zustand";
import { EditTooltipStore } from "../types/stores/editTooltip";

export const useEditTooltipStore = create<EditTooltipStore>((set) => ({
	isVisible: false,
	itemId: null,
	itemName: "",
	position: { x: 0, y: 0 },

	showEditTooltip: (itemId: number, itemName: string, x: number, y: number) =>
		set({
			isVisible: true,
			itemId,
			itemName,
			position: { x, y },
		}),

	hideEditTooltip: () =>
		set({
			isVisible: false,
			itemId: null,
			itemName: "",
			position: { x: 0, y: 0 },
		}),

	updateItemName: (newName: string) => set({ itemName: newName }),
}));
