import React from "react";
import { useTimelineViewStore } from "../../store/timelineViewStore";
import { BoardHeaderProps } from "../../types/components/ui";

const BoardHeader: React.FC<BoardHeaderProps> = ({
	title,
	onAddTask,
	viewMode = "timeline",
	onChangeViewMode,
}) => {
	const { zoomIn, zoomOut, resetZoom, pxPerDay, minPxPerDay, maxPxPerDay } =
		useTimelineViewStore();
	const canZoomOut = pxPerDay > minPxPerDay;
	const canZoomIn = pxPerDay < maxPxPerDay;
	return (
		<div className="shrink-0 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
			<div className="flex items-center justify-between px-6 py-4 gap-4">
				<div className="flex items-center gap-3">
					<h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
						<span className="w-3 h-3 bg-blue-500 rounded-full" />
						{title}
					</h3>
				</div>
				<div className="flex items-center gap-3">
					{onAddTask && (
						<button
							onClick={onAddTask}
							className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow">
							+ Add Task
						</button>
					)}
					{/* Zoom controls (segmented style) */}
					<div className="flex items-stretch h-9">
						<div className="flex rounded-md border border-gray-300 overflow-hidden shadow-sm">
							<button
								onClick={zoomOut}
								disabled={!canZoomOut}
								className={`px-3 text-xs font-medium transition-colors flex items-center disabled:opacity-40 disabled:cursor-not-allowed ${
									canZoomOut
										? "bg-white hover:bg-gray-50 text-gray-700"
										: "bg-gray-100 text-gray-400"
								}`}
								title="Zoom Out">
								−
							</button>
							<button
								onClick={resetZoom}
								className="px-3 text-xs font-medium transition-colors flex items-center bg-white hover:bg-gray-50 text-gray-700"
								title={`Reset Zoom (Current: ${Math.round(
									(pxPerDay / 24) * 100
								)}%)`}>
								{Math.round((pxPerDay / 24) * 100)}%
							</button>
							<button
								onClick={zoomIn}
								disabled={!canZoomIn}
								className={`px-3 text-xs font-medium transition-colors flex items-center disabled:opacity-40 disabled:cursor-not-allowed ${
									canZoomIn
										? "bg-white hover:bg-gray-50 text-gray-700"
										: "bg-gray-100 text-gray-400"
								}`}
								title="Zoom In">
								+
							</button>
						</div>
					</div>
					{onChangeViewMode && (
						<div className="flex rounded-md border border-gray-300 overflow-hidden">
							<button
								className={`px-3 py-2 text-xs font-medium transition-colors ${
									viewMode === "timeline"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
								onClick={() => onChangeViewMode("timeline")}>
								Timeline
							</button>
							<button
								className={`px-3 py-2 text-xs font-medium transition-colors ${
									viewMode === "grid"
										? "bg-blue-500 text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
								onClick={() => onChangeViewMode("grid")}>
								Grid
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BoardHeader;
