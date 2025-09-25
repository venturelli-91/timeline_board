"use client";

import React, { useState } from "react";
import Toast from "./src/components/ui/Toast";
import BoardWrapper from "./src/components/dashboard/BoardWrapper";
import TimelineView from "./src/components/dashboard/TimelineView";
import GridView from "./src/components/dashboard/GridView";
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
		updateItem,
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

	const handleUpdateTask = (
		id: number,
		updates: Parameters<typeof updateItem>[1]
	) => {
		updateItem(id, updates);
		showToast("success", "Task moved successfully!");
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
				<div className="font-sans h-full flex flex-col">
					{viewMode === "timeline" ? (
						<TimelineView
							items={timelineItems}
							onRemove={handleRemoveTask}
							onEdit={handleEditTask}
							onItemUpdate={handleUpdateTask}
							onAddTask={() => setModalOpen(true)}
							viewMode={viewMode}
							onChangeViewMode={setViewMode}
						/>
					) : (
						<GridView
							items={timelineItems}
							onRemove={handleRemoveTask}
							onEdit={handleEditTask}
							onAddTask={() => setModalOpen(true)}
							viewMode={viewMode}
							onChangeViewMode={setViewMode}
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
