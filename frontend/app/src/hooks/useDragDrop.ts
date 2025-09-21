import { useCallback, useEffect } from "react";
import { useDragStore } from "../store/dragStore";
import { TimelineItem } from "../types";

interface UseDragDropProps {
	onItemMove: (
		itemId: number,
		newStartDate: string,
		newEndDate: string
	) => void;
	dayWidth: number;
	laneHeight: number;
	timelineStartDate: Date;
}

export const useDragDrop = ({
	onItemMove,
	dayWidth,
	laneHeight,
	timelineStartDate,
}: UseDragDropProps) => {
	const {
		isDragging,
		draggedItem,
		dragOffset,
		previewPosition,
		startDrag,
		updateDragPosition,
		endDrag,
		cancelDrag,
	} = useDragStore();

	// Convert pixel position to date
	const pixelToDate = useCallback(
		(pixelX: number): string => {
			const daysSinceStart = Math.round(pixelX / dayWidth);
			const newDate = new Date(timelineStartDate);
			newDate.setDate(newDate.getDate() + daysSinceStart);
			return newDate.toISOString().split("T")[0];
		},
		[dayWidth, timelineStartDate]
	);

	// Calculate new dates based on position
	const calculateNewDates = useCallback(
		(left: number, item: TimelineItem) => {
			const originalStartDate = new Date(item.start);
			const originalEndDate = new Date(item.end);
			const duration = Math.ceil(
				(originalEndDate.getTime() - originalStartDate.getTime()) /
					(1000 * 60 * 60 * 24)
			);

			const newStartDate = pixelToDate(left);
			const newEndDateObj = new Date(newStartDate);
			newEndDateObj.setDate(newEndDateObj.getDate() + duration);
			const newEndDate = newEndDateObj.toISOString().split("T")[0];

			return { newStartDate, newEndDate };
		},
		[pixelToDate]
	);

	// Handle mouse move during drag
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging || !draggedItem) return;

			const newLeft = Math.max(0, e.clientX - dragOffset.x);
			const newLane = Math.max(
				0,
				Math.floor((e.clientY - dragOffset.y) / laneHeight)
			);

			updateDragPosition({ left: newLeft, lane: newLane });
		},
		[isDragging, draggedItem, dragOffset, laneHeight, updateDragPosition]
	);

	// Handle mouse up (end drag)
	const handleMouseUp = useCallback(() => {
		if (!isDragging || !draggedItem || !previewPosition) {
			cancelDrag();
			return;
		}

		const { newStartDate, newEndDate } = calculateNewDates(
			previewPosition.left,
			draggedItem
		);
		onItemMove(draggedItem.id, newStartDate, newEndDate);
		endDrag();
	}, [
		isDragging,
		draggedItem,
		previewPosition,
		calculateNewDates,
		onItemMove,
		endDrag,
		cancelDrag,
	]);

	// Handle escape key to cancel drag
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape" && isDragging) {
				cancelDrag();
			}
		},
		[isDragging, cancelDrag]
	);

	// Set up global event listeners
	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp, handleKeyDown]);

	// Start drag handler
	const handleDragStart = useCallback(
		(
			e: React.MouseEvent,
			item: TimelineItem,
			currentLeft: number,
			currentLane: number
		) => {
			e.preventDefault();
			const rect = e.currentTarget.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const offsetY = e.clientY - rect.top;

			startDrag(
				item,
				{ x: offsetX, y: offsetY },
				{ left: currentLeft, lane: currentLane }
			);
		},
		[startDrag]
	);

	return {
		isDragging,
		draggedItem,
		previewPosition,
		handleDragStart,
	};
};
