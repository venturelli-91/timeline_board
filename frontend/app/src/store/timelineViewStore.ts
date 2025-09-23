import { create } from "zustand";
import { TimelineItem } from "../types/common";
import { TimelineViewStore } from "../types/stores/timelineView";

export const useTimelineViewStore = create<TimelineViewStore>((set) => ({
	timelineWidth: 1200,

	getTimelineBounds: (items: TimelineItem[]) => {
		if (items.length === 0) {
			const today = new Date();
			const nextMonth = new Date(
				today.getFullYear(),
				today.getMonth() + 1,
				today.getDate()
			);
			return { startDate: today, endDate: nextMonth };
		}

		const dates = items.flatMap((item) => [
			new Date(item.start),
			new Date(item.end),
		]);
		const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
		const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

		const padding = 7 * 24 * 60 * 60 * 1000;
		minDate.setTime(minDate.getTime() - padding);
		maxDate.setTime(maxDate.getTime() + padding);

		return { startDate: minDate, endDate: maxDate };
	},

	getTotalDays: (startDate: Date, endDate: Date) => {
		return Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);
	},

	getDayWidth: (timelineWidth: number, totalDays: number) => {
		return timelineWidth / totalDays;
	},

	getPositionedItems: (
		items: TimelineItem[],
		startDate: Date,
		dayWidth: number
	) => {
		const basicPositioned = items.map((item) => {
			const itemStartDate = new Date(item.start);
			const itemEndDate = new Date(item.end);

			const startDays = Math.floor(
				(itemStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
			);
			const duration = Math.max(
				1,
				Math.ceil(
					(itemEndDate.getTime() - itemStartDate.getTime()) /
						(1000 * 60 * 60 * 24)
				) + 1
			);

			const left = Math.max(0, startDays * dayWidth);

			const calculatedWidth = duration * dayWidth;
			const width = Math.max(150, Math.min(calculatedWidth, dayWidth * 7));

			return {
				...item,
				left,
				width,
				startDays,
				endDays: startDays + duration,
				lane: 0,
			};
		});

		const sortedItems = [...basicPositioned].sort(
			(a, b) => a.startDays - b.startDays
		);

		const lanes: Array<
			Array<{ startDays: number; endDays: number; id: number }>
		> = [];

		sortedItems.forEach((item) => {
			let assignedLane = -1;
			const buffer = 0.5;

			for (let laneIndex = 0; laneIndex < lanes.length; laneIndex++) {
				const lane = lanes[laneIndex];
				let canFitInLane = true;

				for (const existingItem of lane) {
					const hasOverlap =
						item.startDays < existingItem.endDays + buffer &&
						item.endDays + buffer > existingItem.startDays;

					if (hasOverlap) {
						canFitInLane = false;
						break;
					}
				}

				if (canFitInLane) {
					assignedLane = laneIndex;
					break;
				}
			}

			if (assignedLane === -1) {
				assignedLane = lanes.length;
				lanes.push([]);
			}

			lanes[assignedLane].push({
				startDays: item.startDays,
				endDays: item.endDays,
				id: item.id,
			});

			item.lane = assignedLane;
		});

		return sortedItems;
	},

	setTimelineWidth: (width: number) => {
		set({ timelineWidth: width });
	},
}));
