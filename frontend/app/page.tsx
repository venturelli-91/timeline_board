"use client";

import React, { useState } from "react";
import Toast from "./src/components/ui/Toast";
import BoardWrapper from "./src/components/dashboard/BoardWrapper";
import TimelineBoard from "./src/components/dashboard/TimelineBoard";
import TimelineView from "./src/components/dashboard/TimelineView";
import TaskModal from "./src/components/taskModal/TaskModal";
import { useTimelineStore } from "./src/store/timelineStore";
import { useToastStore } from "./src/store/toastStore";

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "timeline">("timeline");

	// Zustand stores
	const {
		items: timelineItems,
		addItem,
		editItem,
		removeItem,
	} = useTimelineStore();
	const { toast, showToast, hideToast } = useToastStore();

	// Handlers with toast notifications
	const handleAddTask = (item: Parameters<typeof addItem>[0]) => {
		addItem(item);
		showToast("success", "Task added successfully!");
	};

	const handleEditTask = (id: number, name: string) => {
		editItem(id, name);
		showToast("success", "Task updated!");
	};

	const handleRemoveTask = (id: number) => {
		removeItem(id);
		showToast("danger", "Task removed!");
	};

	return (
		<>
			{toast && (
				<div className="fixed top-6 right-6 z-50">
					<Toast
						type={toast.type}
						message={toast.message}
						onClose={hideToast}
					/>
				</div>
			)}
			<BoardWrapper>
				<div className="font-sans">
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold mb-4">Timeline Board</h1>
						<div className="flex gap-4 justify-center items-center mb-4">
							<button
								className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
								onClick={() => setModalOpen(true)}>
								+ Add Task
							</button>
							<div className="flex rounded-md border border-gray-300 overflow-hidden">
								<button
									className={`px-4 py-2 text-sm font-medium ${
										viewMode === "timeline"
											? "bg-blue-500 text-white"
											: "bg-white text-gray-700 hover:bg-gray-50"
									}`}
									onClick={() => setViewMode("timeline")}>
									Timeline View
								</button>
								<button
									className={`px-4 py-2 text-sm font-medium ${
										viewMode === "grid"
											? "bg-blue-500 text-white"
											: "bg-white text-gray-700 hover:bg-gray-50"
									}`}
									onClick={() => setViewMode("grid")}>
									Grid View
								</button>
							</div>
						</div>
					</div>

					{viewMode === "timeline" ? (
						<TimelineView
							items={timelineItems}
							onRemove={handleRemoveTask}
							onEdit={handleEditTask}
						/>
					) : (
						<TimelineBoard
							items={timelineItems}
							onRemove={handleRemoveTask}
							onEdit={handleEditTask}
						/>
					)}
				</div>
				<TaskModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					onAdd={handleAddTask}
				/>
			</BoardWrapper>
		</>
	);
};

export default Home;
