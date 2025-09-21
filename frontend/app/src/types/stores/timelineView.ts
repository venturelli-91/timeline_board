// Timeline view store interfaces
import { TimelineItem, PositionedItem } from "../common";

export interface TimelineViewStore {
	timelineWidth: number;
	getTimelineBounds: (items: TimelineItem[]) => {
		startDate: Date;
		endDate: Date;
	};
	getTotalDays: (startDate: Date, endDate: Date) => number;
	getDayWidth: (timelineWidth: number, totalDays: number) => number;
	getPositionedItems: (
		items: TimelineItem[],
		startDate: Date,
		dayWidth: number
	) => PositionedItem[];
	setTimelineWidth: (width: number) => void;
}
