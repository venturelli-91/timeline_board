import React from "react";
import TimelineBoard from "./TimelineBoard";
import { TimelineBoardProps } from "../../types/components/timeline";

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
			{/* Header duplicated from TimelineView (consider extracting) */}
			<div className="shrink-0 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
				<div className="flex items-center justify-between px-6 py-4 gap-4">
					<div className="flex items-center gap-3">
						<h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
							<span className="w-3 h-3 bg-blue-500 rounded-full" />
							Grid View
						</h3>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={onAddTask}
							className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow">
							+ Add Task
						</button>
						<div className="flex rounded-md border border-gray-300 overflow-hidden">
							<button
								className={`px-3 py-2 text-xs font-medium transition-colors ${
									viewMode === "timeline"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
								onClick={() => onChangeViewMode?.("timeline")}>
								Timeline
							</button>
							<button
								className={`px-3 py-2 text-xs font-medium transition-colors ${
									viewMode === "grid"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
								onClick={() => onChangeViewMode?.("grid")}>
								Grid
							</button>
						</div>
					</div>
				</div>
			</div>

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
