import React, { useMemo } from "react";
import { TimelineViewProps } from "../../types";
import TimeAxis from "../ui/TimeAxis";
import TimelineHeader from "../ui/timeLine/TimelineHeader";
import TimelineControls from "../ui/timeLine/TimelineControls";
import TimelineTasksContainer from "../ui/timeLine/TimelineTasksContainer";
import TimelineTooltip from "../ui/timeLine/TimelineTooltip";
import { useTimelineViewStore } from "../../store/timelineViewStore";
import { useTooltipStore } from "../../store/tooltipStore";

const TimelineView: React.FC<TimelineViewProps> = ({
	items,
	onRemove,
	onEdit,
}) => {
	const {
		timelineWidth,
		getTimelineBounds,
		getTotalDays,
		getDayWidth,
		getPositionedItems,
	} = useTimelineViewStore();

	const { hideTooltip } = useTooltipStore(); // Calculate derived values using store methods
	const timelineBounds = useMemo(
		() => getTimelineBounds(items),
		[items, getTimelineBounds]
	);
	const totalDays = useMemo(
		() => getTotalDays(timelineBounds.startDate, timelineBounds.endDate),
		[timelineBounds, getTotalDays]
	);
	const dayWidth = useMemo(
		() => getDayWidth(timelineWidth, totalDays),
		[timelineWidth, totalDays, getDayWidth]
	);
	const positionedItems = useMemo(
		() => getPositionedItems(items, timelineBounds.startDate, dayWidth),
		[items, timelineBounds.startDate, dayWidth, getPositionedItems]
	);

	// Debug information (remove in production)
	console.log("Timeline Debug:", {
		itemsCount: items.length,
		timelineBounds,
		totalDays,
		dayWidth,
		positionedItemsCount: positionedItems.length,
		timelineWidth,
	});

	return (
		<div className="w-full border border-gray-300 rounded-xl bg-white shadow-lg overflow-hidden">
			<TimelineHeader />

			{/* Debug Info - Remove in production */}
			{items.length === 0 && (
				<div className="p-4 text-center text-gray-500">
					No tasks to display. Add some tasks to see the timeline.
				</div>
			)}

			{/* Scrollable Timeline Container */}
			<div
				className="overflow-x-auto overflow-y-visible"
				style={{ minHeight: "400px" }}>
				<div
					className="relative"
					style={{
						width: `${timelineWidth}px`,
						minWidth: "100%",
						height: "400px",
					}}
					onClick={() => hideTooltip()} // Hide tooltip when clicking on empty space
				>
					<TimeAxis
						startDate={timelineBounds.startDate}
						endDate={timelineBounds.endDate}
						width={timelineWidth}
					/>

					<TimelineTasksContainer
						positionedItems={positionedItems}
						totalDays={totalDays}
						dayWidth={dayWidth}
						onRemove={onRemove}
						onEdit={onEdit}
					/>
				</div>
			</div>

			<TimelineControls
				itemCount={items.length}
				totalDays={totalDays}
			/>

			{/* Timeline Tooltip */}
			<TimelineTooltip />
		</div>
	);
};

export default TimelineView;
