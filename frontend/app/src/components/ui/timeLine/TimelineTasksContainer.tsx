import React from "react";
import TimelineCard from "../cards/TimelineCard";
import TimelineGrid from "./TimelineGrid";
import DragPreview from "./DragPreview";
import { TimelineTasksContainerProps } from "../../../types";
import { useDragDrop } from "../../../hooks/useDragDrop";

const TimelineTasksContainer: React.FC<TimelineTasksContainerProps> = ({
	positionedItems,
	totalDays,
	dayWidth,
	onRemove,
	onItemMove,
	timelineStartDate,
}) => {
	// Calculate the container height based on the maximum lane used
	const maxLane = Math.max(...positionedItems.map((item) => item.lane), 0);
	const containerHeight = Math.max(320, (maxLane + 1) * 80 + 40); // 80px per lane + padding

	// Initialize drag & drop
	const { handleDragStart } = useDragDrop({
		onItemMove: onItemMove || (() => {}),
		dayWidth,
		laneHeight: 80,
		timelineStartDate: timelineStartDate || new Date(),
	});

	return (
		<div
			className="relative py-4"
			style={{ minHeight: `${containerHeight}px`, height: "auto" }}>
			{positionedItems.length === 0 ? (
				<div className="absolute inset-0 flex items-center justify-center text-gray-500">
					No positioned items to display
				</div>
			) : (
				positionedItems.map((item) => {
					const laneHeight = 60; // Increased spacing between lanes
					const topPosition = 20 + item.lane * laneHeight;

					return (
						<div
							key={item.id}
							className="absolute transition-all duration-200 z-10"
							style={{
								left: `${Math.max(0, item.left)}px`,
								width: `${Math.max(150, item.width)}px`, // Minimum width matches store calculation
								top: `${topPosition}px`,
							}}>
							<TimelineCard
								item={item}
								onRemove={onRemove}
								isSelected={false}
								onDragStart={handleDragStart}
								currentLeft={item.left}
								currentLane={item.lane}
							/>
						</div>
					);
				})
			)}

			<TimelineGrid
				totalDays={totalDays}
				dayWidth={dayWidth}
			/>

			{/* Drag Preview */}
			<DragPreview />
		</div>
	);
};

export default TimelineTasksContainer;
