import React from "react";
import CustomCard from "../CustomCard";
import TimelineGrid from "./TimelineGrid";
import { TimelineTasksContainerProps } from "../../../types";
import { useTaskInteractionStore } from "../../../store/taskInteractionStore";

const TimelineTasksContainer: React.FC<TimelineTasksContainerProps> = ({
	positionedItems,
	totalDays,
	dayWidth,
	onRemove,
	onEdit,
}) => {
	const { selectedTaskId, setSelectedTask } = useTaskInteractionStore();

	// Calculate the container height based on the maximum lane used
	const maxLane = Math.max(...positionedItems.map((item) => item.lane), 0);
	const containerHeight = Math.max(320, (maxLane + 1) * 70 + 40); // 70px per lane + padding

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
					const topPosition = 20 + item.lane * 70; // Use lane for positioning
					const isSelected = selectedTaskId === item.id;

					return (
						<div
							key={item.id}
							className={`absolute transition-all duration-200 cursor-pointer ${
								isSelected ? "z-20" : "z-10"
							}`}
							style={{
								left: `${Math.max(0, item.left)}px`,
								width: `${Math.max(120, item.width)}px`,
								top: `${topPosition}px`,
							}}
							onClick={() => {
								// Toggle selection - if already selected, deselect
								setSelectedTask(isSelected ? null : item.id);
							}}>
							<div
								className={`transition-all duration-200 ${
									isSelected
										? "transform scale-105 shadow-lg ring-2 ring-blue-400"
										: "hover:shadow-md"
								}`}>
								<CustomCard
									item={item}
									onRemove={onRemove}
									onEdit={onEdit}
									isSelected={isSelected}
								/>
							</div>
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
