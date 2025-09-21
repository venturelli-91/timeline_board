import { create } from "zustand";
import { TimelineItem } from "../types";

interface DragState {
	isDragging: boolean;
	draggedItem: TimelineItem | null;
	dragOffset: { x: number; y: number };
	originalPosition: { left: number; lane: number };
	previewPosition: { left: number; lane: number } | null;
}

interface DragStore extends DragState {
	startDrag: (
		item: TimelineItem,
		offset: { x: number; y: number },
		originalPos: { left: number; lane: number }
	) => void;
	updateDragPosition: (position: { left: number; lane: number }) => void;
	endDrag: () => void;
	cancelDrag: () => void;
}

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
