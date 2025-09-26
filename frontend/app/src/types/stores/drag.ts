// Drag store interfaces
import { TimelineItem } from "../common";

export interface DragState {
	isDragging: boolean;
	isPendingDrag: boolean;
	draggedItem: TimelineItem | null;
	dragOffset: { x: number; y: number };
	originalPosition: { left: number; lane: number };
	previewPosition: { left: number; lane: number } | null;
	pendingMousePos: { x: number; y: number } | null;
}

export interface DragStore extends DragState {
	prepareDrag: (
		item: TimelineItem,
		offset: { x: number; y: number },
		originalPos: { left: number; lane: number },
		mousePos: { x: number; y: number }
	) => void;
	startDrag: () => void;
	updateDragPosition: (position: { left: number; lane: number }) => void;
	checkDragThreshold: (mousePos: { x: number; y: number }) => boolean;
	endDrag: () => void;
	cancelDrag: () => void;
}
