import { TimelineItem } from "../common";

export interface CustomCardProps {
	item: TimelineItem;
}

export interface TimelineCardProps {
	item: TimelineItem;
	isSelected?: boolean;
}

export interface CompactTimelineCardProps {
	item: TimelineItem;
	onDragStart?: (
		e: React.MouseEvent,
		item: TimelineItem,
		left: number,
		lane: number
	) => void;
	currentLeft?: number;
	currentLane?: number;
}

export interface ExpandedTimelineCardProps {
	item: TimelineItem;
	onRemove?: (id: number) => void;
}
