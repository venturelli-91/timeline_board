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
	const { isDragging, isPendingDrag, draggedItem } = useDragStore();

	// Hide this card if it's being dragged
	const isBeingDragged = isDragging && draggedItem?.id === item.id;
	const isPreparing = isPendingDrag && draggedItem?.id === item.id;

	// Determine visual state
	const getVisualClass = () => {
		if (isBeingDragged) return "opacity-50";
		if (isPreparing) return "ring-2 ring-blue-300 bg-blue-600 shadow-lg";
		return "";
	};

	// Determine cursor
	const getCursor = () => {
		if (isDragging || isPreparing) return "grabbing";
		return "grab";
	};

	return (
		<div
			className={`h-10 bg-blue-500 rounded-md shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-md flex items-center justify-start px-3 border border-blue-600 ${getVisualClass()}`}
			style={{ cursor: getCursor() }}
			onMouseEnter={(e: React.MouseEvent) => {
				// Only show tooltip if not in drag-related states
				if (!isDragging && !isPendingDrag) {
					const rect = e.currentTarget.getBoundingClientRect();
					const x = rect.left + rect.width / 2;
					const y = rect.top;
					showTimelineTooltip(item, x, y);
				}
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
