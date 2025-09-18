import React from "react";

import CustomCard from "../ui/CustomCard";
import { TimelineItem } from "../../types";

interface TimelineBoardProps {
	items: TimelineItem[];
	onRemove?: (id: number) => void;
	onEdit?: (id: number, name: string) => void;
}

const TimelineBoard: React.FC<TimelineBoardProps> = ({
	items,
	onRemove,
	onEdit,
}) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
		{items.map((item) => (
			<CustomCard
				key={item.id}
				item={item}
				onRemove={onRemove}
				onEdit={onEdit}
			/>
		))}
	</div>
);

export default TimelineBoard;
