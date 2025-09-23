import { TimelineItem, PositionedItem } from "../common";

export interface TimelineBoardProps {
	items: TimelineItem[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
}

export interface TimelineViewProps {
	items: TimelineItem[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
	onItemUpdate?: (
		id: number,
		updates: Partial<Omit<TimelineItem, "id">>
	) => void;
}

export interface TimelineHeaderProps {
	title?: string;
}

export interface TimelineControlsProps {
	itemCount: number;
	totalDays: number;
}

export interface TimelineGridProps {
	totalDays: number;
	dayWidth: number;
}

export interface TimelineTasksContainerProps {
	positionedItems: PositionedItem[];
	totalDays: number;
	dayWidth: number;
	onRemove?: (id: number) => void;
	onItemMove?: (
		itemId: number,
		newStartDate: string,
		newEndDate: string
	) => void;
	timelineStartDate?: Date;
}

export interface TimeAxisProps {
	startDate: Date;
	endDate: Date;
	width: number;
}
export interface UseDragDropProps {
	onItemMove: (
		itemId: number,
		newStartDate: string,
		newEndDate: string
	) => void;
	dayWidth: number;
	laneHeight: number;
	timelineStartDate: Date;
}
