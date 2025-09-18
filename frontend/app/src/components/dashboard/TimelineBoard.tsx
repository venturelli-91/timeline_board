import React from "react";
import CustomCard from "../ui/CustomCard";
import { TimelineItem } from "../../types";

const TimelineBoard: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
		{items.map((item) => (
			<CustomCard
				key={item.id}
				item={item}
			/>
		))}
	</div>
);

export default TimelineBoard;
