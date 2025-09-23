import { TimelineItem } from "../common";

export interface TooltipState {
	isVisible: boolean;
	item: TimelineItem | null;
	position: { x: number; y: number };
}

export interface TooltipStore extends TooltipState {
	showTooltip: (item: TimelineItem, x: number, y: number) => void;
	hideTooltip: () => void;
}
