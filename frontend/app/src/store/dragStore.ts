import { create } from "zustand";
import { DragStore } from "../types/stores/drag";

export const useDragStore = create<DragStore>((set) => ({
	isDragging: false,
	draggedItem: null,
	dragOffset: { x: 0, y: 0 },
	originalPosition: { left: 0, lane: 0 },
	previewPosition: null,

	startDrag: (item, offset, originalPos) =>
		set({
			isDragging: true,
			draggedItem: item,
			dragOffset: offset,
			originalPosition: originalPos,
			previewPosition: originalPos,
		}),

	updateDragPosition: (position) => set({ previewPosition: position }),

	endDrag: () =>
		set({
			isDragging: false,
			draggedItem: null,
			dragOffset: { x: 0, y: 0 },
			originalPosition: { left: 0, lane: 0 },
			previewPosition: null,
		}),

	cancelDrag: () =>
		set({
			isDragging: false,
			draggedItem: null,
			dragOffset: { x: 0, y: 0 },
			originalPosition: { left: 0, lane: 0 },
			previewPosition: null,
		}),
}));
