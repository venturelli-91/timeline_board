import React from "react";
import { TimelineCardProps } from "../../../types/components/cards";
import { TimelineItem } from "../../../types/common";
import CompactTimelineCard from "./CompactTimelineCard";
import ExpandedTimelineCard from "./ExpandedTimelineCard";

const TimelineCard = ({
	item,
	onRemove,
	isSelected = false,
	onDragStart,
	currentLeft = 0,
	currentLane = 0,
}: TimelineCardProps & {
	onRemove?: (id: number) => void;
	onDragStart?: (
		e: React.MouseEvent,
		item: TimelineItem,
		left: number,
		lane: number
	) => void;
	currentLeft?: number;
	currentLane?: number;
}) => {
	// Render compact view when not selected
	if (!isSelected) {
		return (
			<CompactTimelineCard
				item={item}
				onDragStart={onDragStart}
				currentLeft={currentLeft}
				currentLane={currentLane}
			/>
		);
	}

	// Render expanded view when selected
	return (
		<ExpandedTimelineCard
			item={item}
			onRemove={onRemove}
		/>
	);
};

export default TimelineCard;
