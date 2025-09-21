import { create } from "zustand";
import { TimelineItem } from "../types";

interface TooltipState {
	isVisible: boolean;
	item: TimelineItem | null;
	position: { x: number; y: number };
}

interface TooltipStore extends TooltipState {
	showTooltip: (item: TimelineItem, x: number, y: number) => void;
	hideTooltip: () => void;
}

export const useTooltipStore = create<TooltipStore>((set) => ({
	isVisible: false,
	item: null,
	position: { x: 0, y: 0 },

	showTooltip: (item: TimelineItem, x: number, y: number) =>
		set({ isVisible: true, item, position: { x, y } }),

	hideTooltip: () =>
		set({ isVisible: false, item: null, position: { x: 0, y: 0 } }),
}));
