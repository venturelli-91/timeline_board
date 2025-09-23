import React from "react";
import { CompactTimelineCardProps } from "../../../types/components/cards";
import { useTooltipStore } from "../../../store/tooltipStore";
import { useDragStore } from "../../../store/dragStore";

const CompactTimelineCard = ({
	item,
	onDragStart,
	currentLeft = 0,
	currentLane = 0,
}: CompactTimelineCardProps) => {
	const { showTooltip: showTimelineTooltip, hideTooltip } = useTooltipStore();
	const { isDragging, draggedItem } = useDragStore();

	// Hide this card if it's being dragged
	const isBeingDragged = isDragging && draggedItem?.id === item.id;

	return (
		<div
			className={`h-10 bg-blue-500 rounded-md shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-md flex items-center justify-start cursor-grab px-3 border border-blue-600 ${
				isBeingDragged ? "opacity-50" : ""
			}`}
			style={{ cursor: isDragging ? "grabbing" : "grab" }}
			onMouseEnter={(e: React.MouseEvent) => {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = rect.left + rect.width / 2;
				const y = rect.top;
				showTimelineTooltip(item, x, y);
			}}
			onMouseLeave={() => {
				hideTooltip();
			}}
			onMouseDown={(e: React.MouseEvent) => {
				// Only start drag on left mouse button
				if (e.button === 0 && onDragStart) {
					e.preventDefault();
					onDragStart(e, item, currentLeft, currentLane);
				}
			}}>
			<span className="text-white text-sm font-medium truncate flex-1">
				{item.name}
			</span>
		</div>
	);
};

export default CompactTimelineCard;
