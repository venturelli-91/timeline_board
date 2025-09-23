import { create } from "zustand";
import { TooltipStore } from "../types/stores/tooltip";
import { TimelineItem } from "../types/common";

export const useTooltipStore = create<TooltipStore>((set) => ({
	isVisible: false,
	item: null,
	position: { x: 0, y: 0 },

	showTooltip: (item: TimelineItem, x: number, y: number) =>
		set({ isVisible: true, item, position: { x, y } }),

	hideTooltip: () =>
		set({ isVisible: false, item: null, position: { x: 0, y: 0 } }),
}));
