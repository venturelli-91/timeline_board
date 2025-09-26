import React from "react";
import { TaskModalUIProps } from "../../types/components/modal";
const TaskModalUI: React.FC<TaskModalUIProps> = ({
	name,
	start,
	end,
	onNameChange,
	onStartChange,
	onEndChange,
	onSubmit,
	onClose,
}) => (
	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
		<div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md">
			<h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
			<form
				onSubmit={onSubmit}
				className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">Task Title</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						required
						placeholder="Enter task title"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Start Date</label>
					<input
						type="date"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={start}
						onChange={(e) => onStartChange(e.target.value)}
						required
						placeholder="Start date"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">End Date</label>
					<input
						type="date"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={end}
						onChange={(e) => onEndChange(e.target.value)}
						required
						placeholder="End date"
					/>
				</div>
				<div className="flex justify-end gap-2 mt-6">
					<button
						type="button"
						className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
						onClick={onClose}>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold">
						Add Task
					</button>
				</div>
			</form>
		</div>
	</div>
);

export default TaskModalUI;
