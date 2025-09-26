import { useCallback, useEffect, useRef } from "react";
import { useDragStore } from "../store/dragStore";
import { TimelineItem } from "../types/common";
import { UseDragDropProps } from "../types/components/timeline";

// UseDragDropProps is exported from types/components/timeline

export const useDragDrop = ({
	onItemMove,
	dayWidth,
	laneHeight,
	timelineStartDate,
}: UseDragDropProps) => {
	const containerRectRef = useRef<DOMRect | null>(null);
	const {
		isDragging,
		isPendingDrag,
		draggedItem,
		dragOffset,
		previewPosition,
		prepareDrag,
		startDrag,
		updateDragPosition,
		checkDragThreshold,
		endDrag,
		cancelDrag,
	} = useDragStore();

	const pixelToDate = useCallback(
		(pixelX: number): string => {
			const daysSinceStart = Math.round(pixelX / dayWidth);
			const newDate = new Date(timelineStartDate);
			newDate.setDate(newDate.getDate() + daysSinceStart);
			return newDate.toISOString().split("T")[0];
		},
		[dayWidth, timelineStartDate]
	);
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

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			const mousePos = { x: e.clientX, y: e.clientY };

			// If pending drag, check if we've moved enough to start dragging
			if (isPendingDrag && !isDragging) {
				if (checkDragThreshold(mousePos)) {
					startDrag();
				}
				return;
			}

			// If actually dragging, update position
			if (!isDragging || !draggedItem) return;
			const rect = containerRectRef.current;
			if (!rect) return;

			const relativeX = e.clientX - rect.left;
			const relativeY = e.clientY - rect.top;

			const newLeft = Math.max(0, relativeX - dragOffset.x);
			const newLane = Math.max(
				0,
				Math.floor((relativeY - dragOffset.y) / laneHeight)
			);

			updateDragPosition({ left: newLeft, lane: newLane });
		},
		[
			isDragging,
			isPendingDrag,
			draggedItem,
			dragOffset,
			laneHeight,
			updateDragPosition,
			checkDragThreshold,
			startDrag,
		]
	);

	// Handle mouse up (end drag)
	const handleMouseUp = useCallback(() => {
		// If we were just pending (not actually dragging), just cancel
		if (isPendingDrag && !isDragging) {
			cancelDrag();
			return;
		}

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
		isPendingDrag,
		draggedItem,
		previewPosition,
		calculateNewDates,
		onItemMove,
		endDrag,
		cancelDrag,
	]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape" && isDragging) {
				cancelDrag();
			}
		},
		[isDragging, cancelDrag]
	);

	useEffect(() => {
		if (isDragging || isPendingDrag) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [
		isDragging,
		isPendingDrag,
		handleMouseMove,
		handleMouseUp,
		handleKeyDown,
	]);

	// Start drag handler
	const handleDragStart = useCallback(
		(
			e: React.MouseEvent,
			item: TimelineItem,
			currentLeft: number,
			currentLane: number
		) => {
			e.preventDefault();

			const timelineContainer = e.currentTarget.closest(
				"[data-timeline-container]"
			) as HTMLElement;
			if (!timelineContainer) return;

			const containerRect = timelineContainer.getBoundingClientRect();
			// store rect for subsequent mousemove events
			containerRectRef.current = containerRect;

			const offsetX = e.clientX - containerRect.left - currentLeft;
			const offsetY = e.clientY - containerRect.top - currentLane * laneHeight;

			// Prepare drag instead of starting immediately
			prepareDrag(
				item,
				{ x: offsetX, y: offsetY },
				{ left: currentLeft, lane: currentLane },
				{ x: e.clientX, y: e.clientY }
			);
		},
		[prepareDrag, laneHeight]
	);

	return {
		isDragging,
		draggedItem,
		previewPosition,
		handleDragStart,
	};
};
