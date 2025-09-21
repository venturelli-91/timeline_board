import { create } from "zustand";
import { TimelineViewStore, TimelineItem } from "../types";

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

		// Add padding to the timeline
		const padding = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
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
		// First, calculate basic positioning for all items
		const basicPositioned = items.map((item) => {
			const itemStartDate = new Date(item.start);
			const itemEndDate = new Date(item.end);

			const startDays = Math.floor(
				(itemStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
			);
			const duration = Math.max(
				1, // Minimum 1 day
				Math.ceil(
					(itemEndDate.getTime() - itemStartDate.getTime()) /
						(1000 * 60 * 60 * 24)
				) + 1
			);

			const left = Math.max(0, startDays * dayWidth);
			const width = Math.max(120, duration * dayWidth);

			return {
				...item,
				left,
				width,
				startDays,
				endDays: startDays + duration,
				lane: 0, // Will be calculated below
			};
		});

		// Sort by start date to process chronologically
		const sortedItems = [...basicPositioned].sort(
			(a, b) => a.startDays - b.startDays
		);

		// Assign lanes to prevent overlapping
		const lanes: Array<
			Array<{ startDays: number; endDays: number; id: number }>
		> = [];

		sortedItems.forEach((item) => {
			// Find the first available lane
			let assignedLane = -1;

			// Check each existing lane to see if this item can fit
			for (let laneIndex = 0; laneIndex < lanes.length; laneIndex++) {
				const lane = lanes[laneIndex];
				let canFitInLane = true;

				// Check if this item overlaps with any item in this lane
				for (const existingItem of lane) {
					// Check for overlap: new item starts before existing ends AND new item ends after existing starts
					const hasOverlap =
						item.startDays < existingItem.endDays &&
						item.endDays > existingItem.startDays;

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

			// If no available lane found, create a new one
			if (assignedLane === -1) {
				assignedLane = lanes.length;
				lanes.push([]);
			}

			// Add the item to the assigned lane
			lanes[assignedLane].push({
				startDays: item.startDays,
				endDays: item.endDays,
				id: item.id,
			});

			// Assign the lane to the item
			item.lane = assignedLane;
		});

		return sortedItems;
	},

	setTimelineWidth: (width: number) => {
		set({ timelineWidth: width });
	},
}));
