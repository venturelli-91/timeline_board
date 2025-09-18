"use client";

import React, { useState } from "react";
import BoardWrapper from "./src/components/dashboard/BoardWrapper";
import TimelineBoard from "./src/components/dashboard/TimelineBoard";
import timelineItemsData from "./src/data/timelineItems";
import TaskModal from "./src/components/taskModal/TaskModal";
import { TimelineItem } from "./src/types";

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [timelineItems, setTimelineItems] =
		useState<TimelineItem[]>(timelineItemsData);

	const handleAddTask = (item: Omit<TimelineItem, "id">) => {
		setTimelineItems((prev: TimelineItem[]) => [
			...prev,
			{
				...item,
				id: prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1,
			},
		]);
	};

	return (
		<>
			<BoardWrapper>
				<div className="font-sans">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-bold">Timeline Board</h1>
						<button
							className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
							onClick={() => setModalOpen(true)}>
							+ Add Task
						</button>
					</div>
					<TimelineBoard items={timelineItems} />
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
