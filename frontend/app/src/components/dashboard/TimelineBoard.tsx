import React from "react";

import CustomCard from "../ui/cards/CustomCard";
import EditTooltip from "../ui/cards/EditTooltip";
import { TimelineBoardProps } from "../../types/components/timeline";

const TimelineBoard: React.FC<TimelineBoardProps> = ({
	items,
	onRemove,
	onEdit,
}) => (
	<>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-visible">
			{items.map((item) => (
				<CustomCard
					key={item.id}
					item={item}
					onRemove={onRemove}
				/>
			))}
		</div>
		<EditTooltip
			onSave={(itemId: number, newName: string) => onEdit?.(itemId, newName)}
		/>
	</>
);

export default TimelineBoard;
