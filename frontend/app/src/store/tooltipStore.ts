import { create } from "zustand";
import { TooltipStore, TimelineItem } from "../types";

export const useTooltipStore = create<TooltipStore>((set) => ({
	isVisible: false,
	item: null,
	position: { x: 0, y: 0 },

	showTooltip: (item: TimelineItem, x: number, y: number) =>
		set({ isVisible: true, item, position: { x, y } }),

	hideTooltip: () =>
		set({ isVisible: false, item: null, position: { x: 0, y: 0 } }),
}));
