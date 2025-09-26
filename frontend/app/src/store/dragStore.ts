import { create } from "zustand";
import { DragStore } from "../types/stores/drag";

export const useDragStore = create<DragStore>((set, get) => ({
	isDragging: false,
	isPendingDrag: false,
	draggedItem: null,
	dragOffset: { x: 0, y: 0 },
	originalPosition: { left: 0, lane: 0 },
	previewPosition: null,
	pendingMousePos: null,

	prepareDrag: (item, offset, originalPos, mousePos) =>
		set({
			isPendingDrag: true,
			draggedItem: item,
			dragOffset: offset,
			originalPosition: originalPos,
			pendingMousePos: mousePos,
		}),

	startDrag: () =>
		set((state) => ({
			isDragging: true,
			isPendingDrag: false,
			previewPosition: state.originalPosition,
		})),

	checkDragThreshold: (mousePos) => {
		const state = get();
		if (!state.isPendingDrag || !state.pendingMousePos) return false;

		const deltaX = Math.abs(mousePos.x - state.pendingMousePos.x);
		const deltaY = Math.abs(mousePos.y - state.pendingMousePos.y);
		const threshold = 8; // 8 pixels threshold

		return deltaX > threshold || deltaY > threshold;
	},

	updateDragPosition: (position) => set({ previewPosition: position }),

	endDrag: () =>
		set({
			isDragging: false,
			isPendingDrag: false,
			draggedItem: null,
			dragOffset: { x: 0, y: 0 },
			originalPosition: { left: 0, lane: 0 },
			previewPosition: null,
			pendingMousePos: null,
		}),

	cancelDrag: () =>
		set({
			isDragging: false,
			isPendingDrag: false,
			draggedItem: null,
			dragOffset: { x: 0, y: 0 },
			originalPosition: { left: 0, lane: 0 },
			previewPosition: null,
			pendingMousePos: null,
		}),
}));
