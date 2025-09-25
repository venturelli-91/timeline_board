import React from "react";
import TimelineBoard from "./TimelineBoard";
import { TimelineBoardProps } from "../../types/components/timeline";
import BoardHeader from "./BoardHeader";

interface GridViewProps extends TimelineBoardProps {
	onAddTask?: () => void;
	viewMode?: "timeline" | "grid";
	onChangeViewMode?: (mode: "timeline" | "grid") => void;
}

const GridView: React.FC<GridViewProps> = ({
	items,
	onRemove,
	onEdit,
	onAddTask,
	viewMode = "grid",
	onChangeViewMode,
}) => {
	return (
		<div className="w-full h-full border border-gray-300 rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
			<BoardHeader
				title="Grid View"
				onAddTask={onAddTask}
				viewMode={viewMode}
				onChangeViewMode={onChangeViewMode}
			/>

			<div className="flex-1 overflow-auto p-6">
				<TimelineBoard
					items={items}
					onRemove={onRemove}
					onEdit={onEdit}
				/>
			</div>
		</div>
	);
};

export default GridView;
