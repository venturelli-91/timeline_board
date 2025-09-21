import React from "react";
import TimelineCard from "../cards/TimelineCard";
import TimelineGrid from "./TimelineGrid";
import { TimelineTasksContainerProps } from "../../../types";

const TimelineTasksContainer: React.FC<TimelineTasksContainerProps> = ({
	positionedItems,
	totalDays,
	dayWidth,
	onRemove,
	onEdit,
}) => {
	// Calculate the container height based on the maximum lane used
	const maxLane = Math.max(...positionedItems.map((item) => item.lane), 0);
	const containerHeight = Math.max(320, (maxLane + 1) * 80 + 40); // 80px per lane + padding

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
					const topPosition = 20 + item.lane * 80; // Use lane for positioning

					return (
						<div
							key={item.id}
							className="absolute transition-all duration-200 z-10"
							style={{
								left: `${Math.max(0, item.left)}px`,
								width: `${Math.max(120, item.width)}px`,
								top: `${topPosition}px`,
							}}>
							<TimelineCard
								item={item}
								onRemove={onRemove}
								onEdit={onEdit}
								isSelected={false}
							/>
						</div>
					);
				})
			)}

			<TimelineGrid
				totalDays={totalDays}
				dayWidth={dayWidth}
			/>
		</div>
	);
};

export default TimelineTasksContainer;
