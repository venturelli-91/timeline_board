// Drag store interfaces
import { TimelineItem } from "../common";

export interface DragState {
	isDragging: boolean;
	draggedItem: TimelineItem | null;
	dragOffset: { x: number; y: number };
	originalPosition: { left: number; lane: number };
	previewPosition: { left: number; lane: number } | null;
}

export interface DragStore extends DragState {
	startDrag: (
		item: TimelineItem,
		offset: { x: number; y: number },
		originalPos: { left: number; lane: number }
	) => void;
	updateDragPosition: (position: { left: number; lane: number }) => void;
	endDrag: () => void;
	cancelDrag: () => void;
}
