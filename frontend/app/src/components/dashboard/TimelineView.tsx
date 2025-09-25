import React, { useMemo } from "react";
import { TimelineViewProps } from "../../types/components/timeline";
import TimeAxis from "../ui/TimeAxis";
import BoardHeader from "./BoardHeader";
import TimelineControls from "../ui/timeLine/TimelineControls";
import TimelineTasksContainer from "../ui/timeLine/TimelineTasksContainer";
import TimelineTooltip from "../ui/timeLine/TimelineTooltip";
import EditTooltip from "../ui/cards/EditTooltip";
import { useTimelineViewStore } from "../../store/timelineViewStore";
import { useTooltipStore } from "../../store/tooltipStore";
import { useEditTooltipStore } from "../../store/editTooltipStore";

const TimelineView: React.FC<TimelineViewProps> = ({
	items,
	onRemove,
	onEdit,
	onItemUpdate,
	onAddTask,
	viewMode = "timeline",
	onChangeViewMode,
}) => {
	const { getTimelineBounds, getTotalDays, getPositionedItems } =
		useTimelineViewStore();

	const { hideTooltip } = useTooltipStore();
	const { hideEditTooltip } = useEditTooltipStore();

	const handleItemMove = (
		itemId: number,
		newStartDate: string,
		newEndDate: string
	) => {
		if (onItemUpdate) {
			onItemUpdate(itemId, { start: newStartDate, end: newEndDate });
		} else if (onEdit) {
			const item = items.find((i) => i.id === itemId);
			if (item) onEdit(itemId, item.name);
		}
	};

	const timelineBounds = useMemo(
		() => getTimelineBounds(items),
		[items, getTimelineBounds]
	);
	const totalDays = useMemo(
		() => getTotalDays(timelineBounds.startDate, timelineBounds.endDate),
		[timelineBounds, getTotalDays]
	);

	// Fixed pixels-per-day scale; expand width as days increase
	const pxPerDay = 24; // tweak for zoom level
	const timelineWidthPx = useMemo(
		() => Math.max(1200, totalDays * pxPerDay),
		[totalDays]
	);

	const positionedItems = useMemo(
		() => getPositionedItems(items, timelineBounds.startDate, pxPerDay),
		[items, timelineBounds.startDate, pxPerDay, getPositionedItems]
	);

	console.log("Timeline Debug:", {
		itemsCount: items.length,
		timelineBounds,
		totalDays,
		pxPerDay,
		positionedItemsCount: positionedItems.length,
		timelineWidthPx,
	});

	return (
		<div className="w-full h-full border border-gray-300 rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
			<BoardHeader
				title="Timeline View"
				onAddTask={onAddTask}
				viewMode={viewMode}
				onChangeViewMode={onChangeViewMode}
			/>

			{items.length === 0 && (
				<div className="p-4 text-center text-gray-500">
					No tasks to display. Add some tasks to see the timeline.
				</div>
			)}

			<div
				className="overflow-x-auto overflow-y-visible flex-1"
				style={{ minHeight: "500px" }}>
				<div
					className="relative"
					style={{
						width: `${timelineWidthPx}px`,
						minWidth: "100%",
						minHeight: "calc(100vh - 260px)",
					}}
					onClick={() => {
						hideTooltip();
						hideEditTooltip();
					}}>
					<TimeAxis
						startDate={timelineBounds.startDate}
						endDate={timelineBounds.endDate}
						width={timelineWidthPx}
					/>

					{(() => {
						const today = new Date();
						if (
							today >= timelineBounds.startDate &&
							today <= timelineBounds.endDate
						) {
							const todayPosition =
								((today.getTime() - timelineBounds.startDate.getTime()) /
									(timelineBounds.endDate.getTime() -
										timelineBounds.startDate.getTime())) *
								timelineWidthPx;

							return (
								<div
									className="absolute inset-y-0 border-l-2 border-red-500 z-40 pointer-events-none"
									style={{ left: todayPosition }}>
									<div className="absolute top-4 left-0 transform -translate-x-1/2 z-50">
										<div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md text-center whitespace-nowrap shadow-md font-semibold">
											TODAY
										</div>
										<div className="absolute top-full left-1/2 transform -translate-x-1/2 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
									</div>
								</div>
							);
						}
						return null;
					})()}

					<TimelineTasksContainer
						positionedItems={positionedItems}
						totalDays={totalDays}
						dayWidth={pxPerDay}
						onRemove={onRemove}
						onItemMove={handleItemMove}
						timelineStartDate={timelineBounds.startDate}
					/>
				</div>
			</div>

			<TimelineControls
				itemCount={items.length}
				totalDays={totalDays}
			/>

			<TimelineTooltip />

			<EditTooltip
				onSave={(itemId: number, newName: string) => onEdit?.(itemId, newName)}
			/>
		</div>
	);
};

export default TimelineView;
